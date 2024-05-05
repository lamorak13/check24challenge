import { JSX } from "solid-js";

export default function getFlagEmoji(
  countryCode: string,
  style?: string
): JSX.Element {
  const codePoints = countryISOMapping[countryCode].iso2
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return <span class={style}>{String.fromCodePoint(...codePoints)}</span>;
}

const countryISOMapping: Record<string, { iso2: string; iso3: string }> = {
  TPE: { iso2: "TW", iso3: "TWN" },

  AFG: { iso2: "AF", iso3: "AFG" },

  ALB: { iso2: "AL", iso3: "ALB" },

  ALG: { iso2: "DZ", iso3: "DZA" },

  ASA: { iso2: "AS", iso3: "ASM" },

  AND: { iso2: "AD", iso3: "AND" },

  ANG: { iso2: "AO", iso3: "AGO" },

  AIA: { iso2: "AI", iso3: "AIA" },

  ANT: { iso2: "AG", iso3: "ATG" },

  ARG: { iso2: "AR", iso3: "ARG" },

  ARM: { iso2: "AM", iso3: "ARM" },

  ARU: { iso2: "AW", iso3: "ABW" },

  AUS: { iso2: "AU", iso3: "AUS" },

  AUT: { iso2: "AT", iso3: "AUT" },

  AZE: { iso2: "AZ", iso3: "AZE" },

  BAH: { iso2: "BS", iso3: "BHS" },

  BRN: { iso2: "BH", iso3: "BHR" },

  BAN: { iso2: "BD", iso3: "BGD" },

  BAR: { iso2: "BB", iso3: "BRB" },

  BLR: { iso2: "BY", iso3: "BLR" },

  BEL: { iso2: "BE", iso3: "BEL" },

  BIZ: { iso2: "BZ", iso3: "BLZ" },

  BEN: { iso2: "BJ", iso3: "BEN" },

  BER: { iso2: "BM", iso3: "BMU" },

  BHU: { iso2: "BT", iso3: "BTN" },

  BOL: { iso2: "BO", iso3: "BOL" },

  AHO: { iso2: "BQ", iso3: "BES" },

  BIH: { iso2: "BA", iso3: "BIH" },

  BOT: { iso2: "BW", iso3: "BWA" },

  BRA: { iso2: "BR", iso3: "BRA" },

  IVB: { iso2: "VG", iso3: "VGB" },

  BRU: { iso2: "BN", iso3: "BRN" },

  BUL: { iso2: "BG", iso3: "BGR" },

  BUR: { iso2: "BF", iso3: "BFA" },

  BDI: { iso2: "BI", iso3: "BDI" },

  CPV: { iso2: "CV", iso3: "CPV" },

  CAM: { iso2: "KH", iso3: "KHM" },

  CMR: { iso2: "CM", iso3: "CMR" },

  CAN: { iso2: "CA", iso3: "CAN" },

  CAY: { iso2: "KY", iso3: "CYM" },

  CAF: { iso2: "CF", iso3: "CAF" },

  CHA: { iso2: "TD", iso3: "TCD" },

  CHI: { iso2: "CL", iso3: "CHL" },

  CHN: { iso2: "CN", iso3: "CHN" },

  HKG: { iso2: "HK", iso3: "HKG" },

  MAC: { iso2: "MO", iso3: "MAC" },

  COL: { iso2: "CO", iso3: "COL" },

  COM: { iso2: "KM", iso3: "COM" },

  CGO: { iso2: "CG", iso3: "COG" },

  COK: { iso2: "CK", iso3: "COK" },

  CRC: { iso2: "CR", iso3: "CRI" },

  CRO: { iso2: "HR", iso3: "HRV" },

  CUB: { iso2: "CU", iso3: "CUB" },

  CYP: { iso2: "CY", iso3: "CYP" },

  CZE: { iso2: "CZ", iso3: "CZE" },

  CIV: { iso2: "CI", iso3: "CIV" },

  PRK: { iso2: "KP", iso3: "PRK" },

  COD: { iso2: "CD", iso3: "COD" },

  DEN: { iso2: "DK", iso3: "DNK" },

  DJI: { iso2: "DJ", iso3: "DJI" },

  DMA: { iso2: "DM", iso3: "DMA" },

  DOM: { iso2: "DO", iso3: "DOM" },

  ECU: { iso2: "EC", iso3: "ECU" },

  EGY: { iso2: "EG", iso3: "EGY" },

  ESA: { iso2: "SV", iso3: "SLV" },

  GEQ: { iso2: "GQ", iso3: "GNQ" },

  ERI: { iso2: "ER", iso3: "ERI" },

  EST: { iso2: "EE", iso3: "EST" },

  ETH: { iso2: "ET", iso3: "ETH" },

  FLK: { iso2: "FK", iso3: "FLK" },

  FAR: { iso2: "FO", iso3: "FRO" },

  FIJ: { iso2: "FJ", iso3: "FJI" },

  FIN: { iso2: "FI", iso3: "FIN" },

  FRA: { iso2: "FR", iso3: "FRA" },

  FGU: { iso2: "GF", iso3: "GUF" },

  FPO: { iso2: "PF", iso3: "PYF" },

  GAB: { iso2: "GA", iso3: "GAB" },

  GAM: { iso2: "GM", iso3: "GMB" },

  GEO: { iso2: "GE", iso3: "GEO" },

  GER: { iso2: "DE", iso3: "DEU" },

  GHA: { iso2: "GH", iso3: "GHA" },

  GIB: { iso2: "GI", iso3: "GIB" },

  GRE: { iso2: "GR", iso3: "GRC" },

  GRL: { iso2: "GL", iso3: "GRL" },

  GRN: { iso2: "GD", iso3: "GRD" },

  GUD: { iso2: "GP", iso3: "GLP" },

  GUM: { iso2: "GU", iso3: "GUM" },

  GUA: { iso2: "GT", iso3: "GTM" },

  GUI: { iso2: "GN", iso3: "GIN" },

  GBS: { iso2: "GW", iso3: "GNB" },

  GUY: { iso2: "GY", iso3: "GUY" },

  HAI: { iso2: "HT", iso3: "HTI" },

  HON: { iso2: "HN", iso3: "HND" },

  HUN: { iso2: "HU", iso3: "HUN" },

  ISL: { iso2: "IS", iso3: "ISL" },

  IND: { iso2: "IN", iso3: "IND" },

  INA: { iso2: "ID", iso3: "IDN" },

  IRI: { iso2: "IR", iso3: "IRN" },

  IRQ: { iso2: "IQ", iso3: "IRQ" },

  IRL: { iso2: "IE", iso3: "IRL" },

  ISR: { iso2: "IL", iso3: "ISR" },

  ITA: { iso2: "IT", iso3: "ITA" },

  JAM: { iso2: "JM", iso3: "JAM" },

  JPN: { iso2: "JP", iso3: "JPN" },

  JOR: { iso2: "JO", iso3: "JOR" },

  KAZ: { iso2: "KZ", iso3: "KAZ" },

  KEN: { iso2: "KE", iso3: "KEN" },

  KIR: { iso2: "KI", iso3: "KIR" },

  KUW: { iso2: "KW", iso3: "KWT" },

  KGZ: { iso2: "KG", iso3: "KGZ" },

  LAO: { iso2: "LA", iso3: "LAO" },

  LAT: { iso2: "LV", iso3: "LVA" },

  LIB: { iso2: "LB", iso3: "LBN" },

  LES: { iso2: "LS", iso3: "LSO" },

  LBR: { iso2: "LR", iso3: "LBR" },

  LBA: { iso2: "LY", iso3: "LBY" },

  LIE: { iso2: "LI", iso3: "LIE" },

  LTU: { iso2: "LT", iso3: "LTU" },

  LUX: { iso2: "LU", iso3: "LUX" },

  MAD: { iso2: "MG", iso3: "MDG" },

  MAW: { iso2: "MW", iso3: "MWI" },

  MAS: { iso2: "MY", iso3: "MYS" },

  MDV: { iso2: "MV", iso3: "MDV" },

  MLI: { iso2: "ML", iso3: "MLI" },

  MLT: { iso2: "MT", iso3: "MLT" },

  MSH: { iso2: "MH", iso3: "MHL" },

  MRT: { iso2: "MQ", iso3: "MTQ" },

  MTN: { iso2: "MR", iso3: "MRT" },

  MRI: { iso2: "MU", iso3: "MUS" },

  MAY: { iso2: "YT", iso3: "MYT" },

  MEX: { iso2: "MX", iso3: "MEX" },

  FSM: { iso2: "FM", iso3: "FSM" },

  MON: { iso2: "MC", iso3: "MCO" },

  MGL: { iso2: "MN", iso3: "MNG" },

  MGO: { iso2: "ME", iso3: "MNE" },

  MNT: { iso2: "MS", iso3: "MSR" },

  MAR: { iso2: "MA", iso3: "MAR" },

  MOZ: { iso2: "MZ", iso3: "MOZ" },

  MYA: { iso2: "MM", iso3: "MMR" },

  NAM: { iso2: "NA", iso3: "NAM" },

  NRU: { iso2: "NR", iso3: "NRU" },

  NEP: { iso2: "NP", iso3: "NPL" },

  NED: { iso2: "NL", iso3: "NLD" },

  NCD: { iso2: "NC", iso3: "NCL" },

  NZL: { iso2: "NZ", iso3: "NZL" },

  NCA: { iso2: "NI", iso3: "NIC" },

  NIG: { iso2: "NE", iso3: "NER" },

  NGR: { iso2: "NG", iso3: "NGA" },

  NIU: { iso2: "NU", iso3: "NIU" },

  NFI: { iso2: "NF", iso3: "NFK" },

  NMA: { iso2: "MP", iso3: "MNP" },

  NOR: { iso2: "NO", iso3: "NOR" },

  OMA: { iso2: "OM", iso3: "OMN" },

  PAK: { iso2: "PK", iso3: "PAK" },

  PLW: { iso2: "PW", iso3: "PLW" },

  PAN: { iso2: "PA", iso3: "PAN" },

  PNG: { iso2: "PG", iso3: "PNG" },

  PAR: { iso2: "PY", iso3: "PRY" },

  PER: { iso2: "PE", iso3: "PER" },

  PHI: { iso2: "PH", iso3: "PHL" },

  POL: { iso2: "PL", iso3: "POL" },

  POR: { iso2: "PT", iso3: "PRT" },

  PUR: { iso2: "PR", iso3: "PRI" },

  QAT: { iso2: "QA", iso3: "QAT" },

  KOR: { iso2: "KR", iso3: "KOR" },

  MDA: { iso2: "MD", iso3: "MDA" },

  ROU: { iso2: "RO", iso3: "ROU" },

  RUS: { iso2: "RU", iso3: "RUS" },

  RWA: { iso2: "RW", iso3: "RWA" },

  REU: { iso2: "RE", iso3: "REU" },

  HEL: { iso2: "SH", iso3: "SHN" },

  SKN: { iso2: "KN", iso3: "KNA" },

  LCA: { iso2: "LC", iso3: "LCA" },

  SPM: { iso2: "PM", iso3: "SPM" },

  VIN: { iso2: "VC", iso3: "VCT" },

  SAM: { iso2: "WS", iso3: "WSM" },

  SMR: { iso2: "SM", iso3: "SMR" },

  STP: { iso2: "ST", iso3: "STP" },

  KSA: { iso2: "SA", iso3: "SAU" },

  SEN: { iso2: "SN", iso3: "SEN" },

  SRB: { iso2: "RS", iso3: "SRB" },

  SEY: { iso2: "SC", iso3: "SYC" },

  SLE: { iso2: "SL", iso3: "SLE" },

  SIN: { iso2: "SG", iso3: "SGP" },

  SVK: { iso2: "SK", iso3: "SVK" },

  SLO: { iso2: "SI", iso3: "SVN" },

  SOL: { iso2: "SB", iso3: "SLB" },

  SOM: { iso2: "SO", iso3: "SOM" },

  RSA: { iso2: "ZA", iso3: "ZAF" },

  ESP: { iso2: "ES", iso3: "ESP" },

  SRI: { iso2: "LK", iso3: "LKA" },

  PLE: { iso2: "PS", iso3: "PSE" },

  SUD: { iso2: "SD", iso3: "SDN" },

  SUR: { iso2: "SR", iso3: "SUR" },

  SWZ: { iso2: "SZ", iso3: "SWZ" },

  SWE: { iso2: "SE", iso3: "SWE" },

  SUI: { iso2: "CH", iso3: "CHE" },

  SYR: { iso2: "SY", iso3: "SYR" },

  TJK: { iso2: "TJ", iso3: "TJK" },

  THA: { iso2: "TH", iso3: "THA" },

  MKD: { iso2: "MK", iso3: "MKD" },

  TLS: { iso2: "TL", iso3: "TLS" },

  TOG: { iso2: "TG", iso3: "TGO" },

  TGA: { iso2: "TO", iso3: "TON" },

  TTO: { iso2: "TT", iso3: "TTO" },

  TUN: { iso2: "TN", iso3: "TUN" },

  TUR: { iso2: "TR", iso3: "TUR" },

  TKM: { iso2: "TM", iso3: "TKM" },

  TKS: { iso2: "TC", iso3: "TCA" },

  TUV: { iso2: "TV", iso3: "TUV" },

  UGA: { iso2: "UG", iso3: "UGA" },

  UKR: { iso2: "UA", iso3: "UKR" },

  UAE: { iso2: "AE", iso3: "ARE" },

  GBR: { iso2: "GB", iso3: "GBR" },

  TAN: { iso2: "TZ", iso3: "TZA" },

  ISV: { iso2: "VI", iso3: "VIR" },

  USA: { iso2: "US", iso3: "USA" },

  URU: { iso2: "UY", iso3: "URY" },

  UZB: { iso2: "UZ", iso3: "UZB" },

  VAN: { iso2: "VU", iso3: "VUT" },

  VEN: { iso2: "VE", iso3: "VEN" },

  VIE: { iso2: "VN", iso3: "VNM" },

  WAF: { iso2: "WF", iso3: "WLF" },

  YEM: { iso2: "YE", iso3: "YEM" },

  ZAM: { iso2: "ZM", iso3: "ZMB" },

  ZIM: { iso2: "ZW", iso3: "ZWE" },
};
