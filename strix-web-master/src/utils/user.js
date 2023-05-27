import { Country } from '../constants/country';

export function UserInfoByCountry(country) {
  switch (country) {
    case Country.Argentina:
      return {
        customerCarePhone: '0810-77-78749',
        operationsCentrePhone: '0800-333-0911',
      };
    case Country.Chile:
      return {
        customerCarePhone: '(+56 2) 2656 9112',
        operationsCentrePhone: '(+56 2) 2760 3400',
      };
    case Country.Uruguay:
      return {
        customerCarePhone: '2915 4646',
        operationsCentrePhone: '08003911',
      };
    default:
      return {
        customerCarePhone: '0810-77-78749',
        operationsCentrePhone: '0800-333-0911',
      };
  }
}

// Used when we are retireving user info
export const loadingUserCountryInfo = {
  customerCarePhone: '0810-77-78749',
  operationsCentrePhone: '0800-333-0911',
};

export default UserInfoByCountry;
