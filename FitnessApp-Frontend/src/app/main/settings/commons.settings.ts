export class SETTINGS {

  public static PUBLIC_KEY = 'Rt5Wx%4d';
  public static ACCESS_TOKEN = 'Eop_ubF';
  public static REFRESH_TOKEN = 'Xer_09s';
  public static LOGGED_USER_ENC = 'Zedij7&';
  public static USER_PRIVILEGES = 'C4d4%rd';
  public static DATE_FORMAT = 'DD/MM/YYYY';
  public static DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';

  public static DATE_TIME = {
    DEFAULT_DATE_FORMAT: 'DD/MM/YYYY',
    DEFAULT_DATE_TIME_FORMAT: 'DD/MM/YYYY HH:mm',
  };

  public static UPLOAD_IMAGE_SIZE_MAX_MB = 25;
  public static UPLOAD_IMAGE_ALLOWED_EXTENSIONS = ['jpg', 'png', 'jpeg'];

  public static TEST_SYSTEM = 'N';
  public static TEST_SYSTEM_DISPLAY_NAME = 'Demo';

  public static TOASTER_MESSAGES = {
    success: 'SUCCESS',
    error: 'ERROR',
    warning: 'WARNING',
    info: 'INFO',
    custom: 'CUSTOM'
  };

  public static PAGES = {
    home: '/home'
  };

  public static KEYS = {
    PUBLIC_KEY:
      '-----BEGIN PUBLIC KEY-----\n' +
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDO/pdXiY1LBBjVARZ5QAejI3id\n' +
      'ZZEDHW26zNaJnjffCobZPW16ArQTeM/pmWJ34FDgL+4Ev395pwlfmcLnBmRV6yTh\n' +
      'ur5yqZuVSYWQGFOG8VL5+R0yVFJMCF3UvHJpsXxBpmfHMOqg/08KXUxDSmJKmqsS\n' +
      'mn6rrbleupj0hci5OQIDAQAB' +
      '-----END PUBLIC KEY-----',

    SECRET: 'iIUsWtNZcf'
  };

  public static ENDPOINTS = {
    loadPublicKey: {
      headerParam: {
        showLoading: false,
        showToast: false,
        skipAuth: true
      },
      url: '/fitness-app/api/public_key',
      type: 'GET'
    },

    login: {
      mockUrl: false,
      headerParam: {
        showLoading: true,
        showToast: true,
        excludeError: [401],
        skipAuth: true
      },
      url: '/fitness-app/api/auth/login',
      type: 'POST'
    },

    refreshToken: {
      headerParam: {
        showLoading: false,
        showToast: true,
        skipAuth: false
      },
      url: '/fitness-app/api/getToken',
      type: 'POST'
    },

    expireUserCache: {
      headerParam: {
        showLoading: false,
        showToast: false,
        skipAuth: false
      },
      url: '/fitness-app/api/security/log-out',
      type: 'POST'
    },

    registerUser: {
      url: '/fitness-app/api/user/registerUser',
      type: 'POST'
    },

    searchUsers: {
      headerParam: {
        showLoading: true,
        showToast: true,
        skipAuth: false
      },
      url: '/fitness-app/api/user/searchUsers',
      type: 'POST'
    },

    searchWorkouts: {
      headerParam: {
        showLoading: true,
        showToast: true,
        skipAuth: false
      },
      url: '/fitness-app/api/workout/searchWorkouts',
      type: 'POST'
    },

    saveOrUpdateUser: {
      headerParam: {
        showLoading: true,
        showToast: true,
        skipAuth: false
      },
      url: '/fitness-app/api/user/saveOrUpdateUser',
      type: 'POST'
    },

    getUserByID: {
      headerParam: {
        showLoading: true,
        showToast: true,
        skipAuth: false
      }, url: '/fitness-app/api/user/getUserByID',
      type: 'GET'
    },

    changeUserPassword: {
      headerParam: {
        showLoading: true,
        showToast: true,
        skipAuth: false
      },
      url: '/fitness-app/api/user/changeUserPassword',
      type: 'POST'
    },

    resetUserPassword: {
      headerParam: {
        showLoading: true,
        showToast: true,
        skipAuth: false
      }, url: '/fitness-app/api/user/resetUserPassword',
      type: 'GET'
    },

    saveOrUpdateWorkout: {
      headerParam: {
        showLoading: true,
        showToast: true,
        skipAuth: false
      },
      url: '/fitness-app/api/workout/saveOrUpdateWorkout',
      type: 'POST'
    },
  };

}
