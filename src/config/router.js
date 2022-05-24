import {
    createStackNavigator
} from "react-navigation-stack";
import { createAppContainer } from "react-navigation"
import { COLOR } from './styles';
import Login from '../screens/login';
import Splash from '../screens/splash';
import ParentProfile from '../screens/parent_profile';
import AddKidDetail from '../screens/add_kid_detail';
import RateDemoClass from '../screens/BookDemoScreen/rate_demo_class';
import FaqScreen from '../screens/AppScreens/faq_screen';
import Dashboard from '../screens/AppScreens/dashboard';
import HomeReportScreen from "../screens/AppScreens/HomeReportScreen";
import BookDemoScreen from '../screens/BookDemoScreen/book_demo_screen';
import DemoConfirmation from '../screens/BookDemoScreen/demo_confirmation';
import TeacherProfile from '../screens/BookDemoScreen/teacher_profile';
import ViewCurriculum from '../screens/AppScreens/view_curriculum';
import CartListScreen from '../screens/CartScreen/cart_screen';
import CartAddress from "../screens/CartScreen/cart_address";
import AddAddress from "../screens/CartScreen/add_address";
import PaymentSuccessScreen from "../screens/PaymentScreens/payment_success_screen";
import PaymentFailedScreen from "../screens/PaymentScreens/payment_failed_screen";
import ChooseLiveBatch from "../screens/BatchScreens/choose_live_batch";
import PreferLiveBatchScreen from "../screens/BatchScreens/prefer_live_batch";
import MoreProfileScreen from "../screens/MoreScreens/more_profile_screen";
import MoreEditProfileScreen from "../screens/MoreScreens/more_edit_profile_screen";
import OverallActivitiesScreen from "../screens/ReportScreens/OverallActivitiesScreen";
import ActivityReportScreen from "../screens/ReportScreens/ActivityReportScreen";
import StarBadgeReportScreen from "../screens/ReportScreens/StarBadgeReportScreen";
import MoreLiveClassBatchScreens from "../screens/MoreScreens/more_live_class_batch_screes";
import MoreMySubscriptions from "../screens/MoreScreens/more_my_subcriptions";
import SubscriptonDetailsScreen from "../screens/SubscriptionScreens/SubscriptonDetailsScreen";
import SubscriptonOrderDetails from "../screens/SubscriptionScreens/SubscriptonOrderDetails";
import SubscriptonMathboxDetails from "../screens/SubscriptionScreens/SubscriptonMathboxDetails";
import MoreMyAddressScreen from "../screens/MoreScreens/more_my_address_screen";
import MoreHelpScreen from "../screens/MoreScreens/more_help_screen";
import EditKidDetail from "../screens/MyKids/EditKidDetail";
import MainScreen from "../screens/AppScreens/MainScreen";
import Main from "react-native-country-picker-modal";
import DemoDetails from '../screens/BookDemoScreen/demo_details';
import DemoClassResults from '../screens/BookDemoScreen/demo_class_results';
import RenewSubscription from '../screens/SubscriptionScreens/RenewSubscription';
import ShowSubscriptions from "../screens/SubscriptionScreens/ShowSubscriptions";
import ClassDetailsScreen from '../screens/ScheduleScreens/ClassDetailsScreen';
import ClassListScreen from '../screens/ScheduleScreens/ClassListScreen';
import LiveClassSchedule from '../screens/ScheduleScreens/LiveClassSchedule';
import MoreNotificationScreen from '../screens/MoreScreens/more_notification_screen';
import ParentConnect from "../screens/ParentPeakScreen/ParentConnect";






const AppStackNavigator = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: ''

        }

    },
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },


    ParentProfile: {
        screen: ParentProfile,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },

    CartAddress: {
        screen: CartAddress,
        navigationOptions: {
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },




    AddKidDetail: {
        screen: AddKidDetail,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    EditKidDetail: {
        screen: EditKidDetail,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''


        }
    },
    BookDemoScreen: {
        screen: BookDemoScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''


        }
    },

    RateDemoClass: {
        screen: RateDemoClass,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },

    DemoClassResults: {
        screen: DemoClassResults,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },

    ParentConnect: {
        screen: ParentConnect,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },

    PaymentFailedScreen: {
        screen: PaymentFailedScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    PaymentSuccessScreen: {
        screen: PaymentSuccessScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },






    MainScreen: {
        screen: MainScreen,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },




    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },


    HomeReportScreen: {
        screen: HomeReportScreen,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },

    MoreMyAddressScreen: {
        screen: MoreMyAddressScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    MoreNotificationScreen: {
        screen: MoreNotificationScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    MoreHelpScreen: {
        screen: MoreHelpScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    SubscriptonDetailsScreen: {
        screen: SubscriptonDetailsScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    SubscriptonOrderDetails: {
        screen: SubscriptonOrderDetails,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    SubscriptonMathboxDetails: {
        screen: SubscriptonMathboxDetails,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    MoreMySubscriptions: {
        screen: MoreMySubscriptions,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },

    OverallActivitiesScreen: {
        screen: OverallActivitiesScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    ActivityReportScreen: {
        screen: ActivityReportScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    MoreLiveClassBatchScreens: {
        screen: MoreLiveClassBatchScreens,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    StarBadgeReportScreen: {
        screen: StarBadgeReportScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    MoreEditProfileScreen: {
        screen: MoreEditProfileScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    MoreProfileScreen: {
        screen: MoreProfileScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    RenewSubscription: {
        screen: RenewSubscription,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    ShowSubscriptions: {
        screen: ShowSubscriptions,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    ClassDetailsScreen: {
        screen: ClassDetailsScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    ClassListScreen: {
        screen: ClassListScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    LiveClassSchedule: {
        screen: LiveClassSchedule,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    ChooseLiveBatch: {
        screen: ChooseLiveBatch,
        navigationOptions: {
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },

    PreferLiveBatchScreen: {
        screen: PreferLiveBatchScreen,
        navigationOptions: {
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    TeacherProfile: {
        screen: TeacherProfile,
        navigationOptions: {
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },

    AddAddress: {
        screen: AddAddress,
        navigationOptions: {
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },

    ViewCurriculum: {
        screen: ViewCurriculum,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    CartListScreen: {
        screen: CartListScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },


    DemoConfirmation: {
        screen: DemoConfirmation,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    DemoDetails: {
        screen: DemoDetails,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },
    TeacherProfile: {
        screen: TeacherProfile,
        navigationOptions: {
            headerShown: false,
            headerBackTitleVisible: false,
            headerTitle: ''
        }
    },




    FaqScreen: {
        screen: FaqScreen,
        navigationOptions: {
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: ''

        }
    },



})
export const AppStack = createAppContainer(AppStackNavigator);





