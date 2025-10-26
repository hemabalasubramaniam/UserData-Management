export interface AppConfig {
  features: {
    editEnabled: boolean;
    deleteEnabled: boolean;
  };
  validation: {
    name: {
      minLength: number;
      maxLength: number;
    };
  };
}

const appConfig: AppConfig = {
  features: {
    editEnabled: true,
    deleteEnabled: true,
  },
  validation: {
    name: {
      minLength: 3,
      maxLength: 30,
    },
  },
};

export default appConfig;