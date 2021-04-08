import moment from "moment";

export const parseDateToUS = (value: Date, originalValue: string): Date => {
  return new Date(moment(originalValue, 'DD/MM/YYYY').format('MM/DD/YYYY'));
};

export const parseDateToPTBR = (birthday: any): string => {
  return new Intl.DateTimeFormat('pt-BR').format(birthday);
}