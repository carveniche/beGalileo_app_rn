import UserNotifications
class NotificationService: UNNotificationServiceExtension {
var contentHandler: ((UNNotificationContent) -> Void)?
var bestAttemptContent: UNMutableNotificationContent?
override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
  self.contentHandler = contentHandler
       bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
       
       // get the variables that is needed later.
       guard let bestAttemptContent = bestAttemptContent,
         let attachmentURLAsString = bestAttemptContent.userInfo["icon"] as? String,
       // "icon" is the key for the image url in the notification. It
       // could be named whatever you want.
         let attachmentURL = URL(string: attachmentURLAsString) else {
           return
       }
       
       // call a custom function to download the image before attaching
       // it to the notification and presenting it.
       downloadImageFrom(url: attachmentURL) { (attachment) in
         if let attachment = attachment {
           bestAttemptContent.attachments = [attachment]
           contentHandler(bestAttemptContent)
         }
         
       }
}
  private func downloadImageFrom(url: URL, with completionHandler: @escaping (UNNotificationAttachment?) -> Void) {
      let task = URLSession.shared.downloadTask(with: url) { (downloadedUrl, response, error) in
        
        //verify that a url exists.
        guard let downloadedUrl = downloadedUrl else {
          completionHandler(nil)
          return
        }
        
        // create a local unique filepath.
        var urlPath = URL(fileURLWithPath: NSTemporaryDirectory())
        let uniqueURLEnding = ProcessInfo.processInfo.globallyUniqueString + ".png"
        urlPath = urlPath.appendingPathComponent(uniqueURLEnding)
        
        // fetch the image from the url
        try? FileManager.default.moveItem(at: downloadedUrl, to: urlPath)
        
        // if successful, return the image as an attachment.
        do {
          let attachment = try UNNotificationAttachment(identifier: "picture", url: urlPath, options: nil)
          completionHandler(attachment)
        } catch {
          completionHandler(nil)
        }
      }
      task.resume()
    }
override func serviceExtensionTimeWillExpire() {
// Called just before the extension will be terminated by the system.
// Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
contentHandler(bestAttemptContent)
}
}
}
