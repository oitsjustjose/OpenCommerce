import LocalizedStrings from 'react-localization';

export const General = new LocalizedStrings({
  en: {
    yes: 'Yes',
    no: 'No',
    close: 'Close',
    save: 'Save',
    openMenu: 'Open Menu',
    login: 'Log In',
    logout: 'Log Out',
    changeColorMode: 'Toggle Light/Dark Theme',
    footer: {
      part1: 'Made with 💙 by',
      part2: 'using',
    },
  },
});

export const Home = new LocalizedStrings({
  en: {
    downloadFailedAlert: {
      header: 'Failed to Download Products',
    },
  },
});

export const Product = new LocalizedStrings({
  en: {
    downloadFailedAlert: {
      header: 'Failed to Get Product Details',
    },
  },
});

export const Manage = new LocalizedStrings({
  en: {
    edit: {
      title: (name) => `Editing ${name}`,
    },
    create: {
      title: 'Create Product',
      fileUpload: (count) => `${count || 'No'} ${count === 1 ? 'File' : 'Files'} Selected`,
      itemCreatedSuccess: (id) => ({
        header: 'Item Added!',
        content: `Item created with ID ${id}`,
      }),
    },
    labels: {
      name: 'Name',
      desc: 'Description',
      price: 'Price',
      qty: 'Quantity',
      rating: 'Rating',
      hidden: 'Hidden',
      required: 'This Field is Required',
      save: 'Save Product',
      saveChanges: 'Save Changes',
    },
  },
});

export const Login = new LocalizedStrings({
  en: {
    logoutAlert: {
      header: 'You Have Been Logged Out',
      content: 'You\'ve been logged out automatically as it has been more than 1 day since you last logged in. Please log in again.',
    },
    labels: {
      register: 'Need an account? Click here!',
      email: 'Email Address',
      password: 'Password',
      required: 'This Field is Required',
    },
    buttons: {
      submit: 'Log In',
    },
  },
});

export const Register = new LocalizedStrings({
  en: {
    createAccountSuccess: {
      header: 'Account Created!',
      content: 'You\'ll receive an account confirmation email shortly! Sit tight until you have verified your account.',
    },
    createAccountFailure: ({ error }) => ({
      header: 'Unable to Create Account',
      content: error,
    }),
    labels: {
      login: 'Already have an account? Sign in here!',
      first: 'First Name',
      last: 'Last Name',
      email: 'Email Address',
      password: 'Password',
      conf: 'Verify Password',
      match: 'Passwords must match',
      required: 'This Field is Required',
      privacy: 'None of this information will be shared',
      register: 'Register',
    },
  },
});
