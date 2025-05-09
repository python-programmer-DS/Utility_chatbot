export interface ChatbotInstanceConfig {
  tenantId: string;
  botName: string;
  logoUrl: string;
  theme: 'blue' | 'green' | 'custom';
  tokenEndpoint: string;
  links: {
    payment: string;
    registration: string;
    support: string;
    sales: string;
    billingPortal: string;
  };
  menus: {
    resident: string[];
    propertyManager: string[];
    support: string[];
    sales: string[];
  };
}

export const chatbotConfig: ChatbotInstanceConfig = {
  tenantId: 'ancenergy',
  botName: 'Energos',
  logoUrl: 'https://via.placeholder.com/40',
  theme: 'blue',
  tokenEndpoint: 'http://localhost:4000/api/token?tenant=ancenergy',
  links: {
    payment: 'https://utilitycentral.billingassociatesgroup.com/CustomerOnlinePayment.aspx',
    registration: 'https://utilitycentral.billingassociatesgroup.com/CustomerRegistration.aspx',
    support: 'https://www.billingassociatesgroup.com/#!/contact',
    sales: 'https://www.billingassociatesgroup.com/#!/contact',
    billingPortal: 'https://www.billingassociatesgroup.com/',
  },
  menus: {
    resident: [
      'Login into my Account',
      'My Account Status',
      'Make Online Payment',
      'What is my Outstanding',
      'Need Copy of my latest Bill',
      'New User – Click here to Signup',
      'Others',
      'Back to Main Menu',
    ],
    propertyManager: [
      'Login into my Account',
      'Get Ageing Report',
      'Get a Residents Outstanding Amount',
      'Get a Residents Latest Bill',
      'Others',
      'Back to Main Menu',
    ],
    support: ['Contact Support'],
    sales: ['Contact Sales'],
  },
};
