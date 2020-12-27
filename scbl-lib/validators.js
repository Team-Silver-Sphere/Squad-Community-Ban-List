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
    type: yup.string().oneOf(['remote', 'battlemetrics']),
    defaultActivePoints: yup
      .number()
      .required('A default number of points per active ban is required.'),
    defaultExpiredPoints: yup
      .number()
      .required('A default number of points per expired ban is required.'),
    discordWebhook: yup
      .string()
      .url('Invalid Discord Webhook')
      .matches(/^$|^https:\/\/discordapp.com\/api\/webhooks\//, 'Invalid Discord Webhook')
  },
  ExportBanListConfig: {
    banList: yup.number().required('A ban list must be specified.'),
    activePoints: yup.number().required('A number of points per active ban is required.'),
    expiredPoints: yup.number().required('A number of points per expired ban is required.')
  }
};
