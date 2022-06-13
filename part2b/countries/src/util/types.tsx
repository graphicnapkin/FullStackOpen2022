export interface CountryType {
  name: Name;
  tld?: (string)[] | null;
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currencies;
  idd: Idd;
  capital?: (string)[] | null;
  altSpellings?: (string)[] | null;
  region: string;
  subregion: string;
  languages: Languages;
  translations: Translations;
  latlng?: (number)[] | null;
  landlocked: boolean;
  borders?: (string)[] | null;
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  gini: Gini;
  fifa: string;
  car: Car;
  timezones?: (string)[] | null;
  continents?: (string)[] | null;
  flags: FlagsOrCoatOfArms;
  coatOfArms: FlagsOrCoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
}
export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}
export interface NativeName {
  deu: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
}
export interface DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho {
  official: string;
  common: string;
}
export interface Currencies {
  EUR: EUR;
}
export interface EUR {
  name: string;
  symbol: string;
}
export interface Idd {
  root: string;
  suffixes?: (string)[] | null;
}
export interface Languages {
  deu: string;
}
export interface Translations {
  ara: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  ces: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  cym: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  deu: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  est: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  fin: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  fra: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  hrv: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  hun: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  ita: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  jpn: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  kor: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  nld: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  per: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  pol: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  por: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  rus: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  slk: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  spa: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  swe: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  urd: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
  zho: DeuOrAraOrCesOrCymOrEstOrFinOrFraOrHrvOrHunOrItaOrJpnOrKorOrNldOrPerOrPolOrPorOrRusOrSlkOrSpaOrSweOrUrdOrZho;
}
export interface Demonyms {
  eng: EngOrFra;
}
export interface EngOrFra {
  f: string;
  m: string;
}
export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}
export interface Gini {
  2016: number;
}
export interface Car {
  signs?: (string)[] | null;
  side: string;
}
export interface FlagsOrCoatOfArms {
  png: string;
  svg: string;
}
export interface CapitalInfo {
  latlng?: (number)[] | null;
}
export interface PostalCode {
  format: string;
  regex: string;
}
