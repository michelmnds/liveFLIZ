import { custom, minLength, object, pipe, string } from 'valibot';

/*
 * Returns `true` if the IBAN is valid
 * Returns `false` if the IBAN's length is not as should be (for CY the IBAN Should be 28 chars long starting with CY )
 * Returns any other number (checksum) when the IBAN is invalid (check digits do not match)
 * @param {string} input
 * @returns {boolean}
 */
function ibanValidator(input: string) {
  const CODE_LENGTHS = {
    // AD: 24, // Andorra
    // AE: 23, // United Arab Emirates
    AT: 20, // Austria
    // AZ: 28, // Azerbaijan
    // BA: 20, // Bosnia and Herzegovina
    BE: 16, // Belgium
    BG: 22, // Bulgaria
    // BH: 22, // Bahrain
    // BR: 29, // Brazil
    // CH: 21, // Switzerland
    // CR: 21, // Costa Rica
    CY: 28, // Cyprus
    CZ: 24, // Czech Republic
    DE: 22, // Germany
    DK: 18, // Denmark
    // DO: 28, // Dominican Republic
    EE: 20, // Estonia
    ES: 24, // Spain
    FI: 18, // Finland
    // FO: 18, // Faroe Islands
    FR: 27, // France
    // GB: 22, // United Kingdom
    // GI: 23, // Gibraltar
    // GL: 18, // Greenland
    GR: 27, // Greece
    // GT: 28, // Guatemala
    HR: 21, // Croatia
    HU: 28, // Hungary
    IE: 22, // Ireland
    // IL: 23, // Israel
    /// IS: 26, // Iceland
    IT: 27, // Italy
    // JO: 30, // Jordan
    // KW: 30, // Kuwait
    // KZ: 20, // Kazakhstan
    // LB: 28, // Lebanon
    LI: 21, // Liechtenstein
    LT: 20, // Lithuania
    LU: 20, // Luxembourg
    LV: 21, // Latvia
    // MC: 27, // Monaco
    // MD: 24, // Moldova
    // ME: 22, // Montenegro
    // MK: 19, // North Macedonia
    // MR: 27, // Mauritania
    MT: 31, // Malta
    // MU: 30, // Mauritius
    NL: 18, // Netherlands
    // NO: 15, // Norway
    // PK: 24, // Pakistan
    PL: 28, // Poland
    // PS: 29, // Palestine
    PT: 25, // Portugal
    // QA: 29, // Qatar
    RO: 24, // Romania
    // RS: 22, // Serbia
    // SA: 24, // Saudi Arabia
    SE: 24, // Sweden
    SI: 19, // Slovenia
    SK: 24 // Slovakia
    // SM: 27, // San Marino
    // TN: 24, // Tunisia
    // TR: 26, // Turkey
    // AL: 28, // Albania
    // BY: 28, // Belarus
    // CR: 22, // Costa Rica
    // EG: 29, // Egypt
    // GE: 22, // Georgia
    // IQ: 23, // Iraq
    // LC: 32, // Saint Lucia
    // SC: 31, // Seychelles
    // ST: 25, // São Tomé and Príncipe
    // SV: 28, // El Salvador
    // TL: 23, // East Timor
    // UA: 29, // Ukraine
    // VA: 22, // Vatican City
    // VG: 24, // British Virgin Islands
    // XK: 20, // Kosovo
  };

  const iban = String(input)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, ''); // keep only alphanumeric characters
  const code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/); // match and capture (1) the country code, (2) the check digits, and (3) the rest
  let digits = '';

  // check syntax and length
  if (!code || iban.length !== CODE_LENGTHS[code[1] as keyof typeof CODE_LENGTHS]) {
    return false;
  }

  // rearrange country code and check digits, and convert chars to ints
  digits = (code[3] + code[1] + code[2])
    .replace(/[A-Z]/g, (letter: string) => (letter.charCodeAt(0) - 55).toString())
    .toString();

  // final check
  return mod97(digits) === 1;
}

function mod97(string: string) {
  let checksum: string | number = string.slice(0, 2);
  let fragment;
  for (let offset = 2; offset < string.length; offset += 7) {
    fragment = String(checksum) + string.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
}

export const ibanSchema = object({
  iban: pipe(
    string(),
    minLength(1, 'Errors.invalidIBAN'),
    custom(input => (typeof input === 'string' ? ibanValidator(input) : false), 'Errors.invalidIBAN')
  )
});
