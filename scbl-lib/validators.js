import * as yup from 'yup';

export default {
  ExportBanList: {
    name: yup
      .string()
      .required('A name between 1 and 40 characters long is required.')
      .min(1, 'A name between 1 and 40 characters long is required.')
      .max(40, 'A name between 1 and 40 characters long is required.'),
    server: yup
      .string()
      .required('A community/server name between 1 and 40 characters long is required.')
      .min(1, 'A community/server name between 1 and 40 characters long is required.')
      .max(40, 'A community/server name between 1 and 40 characters long is required.'),
    threshold: yup
      .number()
      .required('A threshold greater than or equal to 0 is required.')
      .min(0, 'A threshold greater than or equal to 0 is required.'),
    defaultActivePoints: yup
      .number()
      .required('A default number of points per active ban is required.'),
    defaultExpiredPoints: yup
      .number()
      .required('A default number of points per expired ban is required.')
  }
};
