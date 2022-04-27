import LocalizedStrings from 'react-localization';

export const General = new LocalizedStrings({
  en: {
    yes: 'Yes',
    no: 'No',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    openMenu: 'Open Menu',
    login: 'Log In',
    logout: 'Log Out',
    changeColorMode: 'Toggle Light/Dark Theme',
    loading: 'Loading..',
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
    soldOut: 'Sold Out',
    addToCart: 'Add To Cart',
    description: 'Description',
    noPhotos: 'No Photos Available',
  },
});

export const Manage = new LocalizedStrings({
  en: {
    title: 'Product Management',
    edit: {
      title: (name) => `Editing ${name}`,
      alerts: {
        success: 'Product Updated Successfully!',
        failure: 'Failed to Edit Product',
        delete: 'Are you sure you want to delete this product?',
        deleteImage: 'Do you want to delete this image?',
      },
    },
    create: {
      button: 'Create',
      title: 'Create Product',
      alerts: {
        success: 'Product Created Successfully!',
        failure: 'Failed to Create Product',
      },
    },
    missingInfo: {
      header: 'Missing Info',
      content: 'Not all required fields have been filled. Please provide this info to proceed.',
    },
    fileUpload: (count) => `${count || 'No'} ${count === 1 ? 'File' : 'Files'} Selected`,
    labels: {
      name: 'Name',
      desc: 'Description',
      price: 'Price',
      qty: 'Quantity',
      rating: 'Rating',
      hidden: 'Hidden',
      required: 'This Field is Required',
      saveProduct: 'Save Product',
      saveChanges: 'Save Changes',
      delete: 'Delete Product',
      search: 'Search..',
      noReview: 'No Reviews',
    },
  },
});

export const Login = new LocalizedStrings({
  en: {
    error: 'There was an Error Logging In',
    logoutAlert: {
      header: 'You Have Been Logged Out',
      content: 'You\'ve been logged out automatically as it has been more than 1 day since you last logged in. Please log in again.',
    },
    labels: {
      register: 'Need an account? Click here!',
      email: 'Email Address',
      password: 'Password',
      required: 'This Field is Required',
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
