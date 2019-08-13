import validate from 'validate.js';

validate.validators.percentageSum = (value, options) => {
  const values = value.values;
  if (!validate.isArray(values)) {
    return `Uno o mas valores son invalidos`;
  }
  if (!options.required && values.length === 0) {
    return;
  }
  if (options.verifyAll) {
    const quantity = value.quantity;
    if (!validate.isNumber(quantity)) {
      return `Uno o mas valores son invalidos`;
    }
    const onlyNumbers = values.filter(val => !isNaN(val));
    if (quantity !== onlyNumbers.length) {
      return `Todas las respuestas deben ser numéricas`;
    }
  }
  const sum = values.reduce((acc, val) => acc + (!isNaN(val) ? Number.parseFloat(val) : 0), 0);
  if (!!options.sum && sum !== options.sum) {
    return `Todas las respuestas deben sumar ${options.sum}`;
  }
};

const emailConstraints = {
  foo: {
    presence: {
      presence: true,
      message: 'This field is empty',
    },
    email: {
      email: true,
      message: 'Incorrect email format',
    },
  },
};

const sumOneHundredConstraints = {
  foo: {
    percentageSum: {
      sum: 100,
      verifyAll: true,
    },
  },
};

const sumNumbersConstraints = {
  foo: {
    percentageSum: {
      sum: null,
      verifyAll: true,
    },
  },
};

const sumSelectedOneHundredConstraints = {
  foo: {
    percentageSum: {
      sum: 100,
      verifyAll: true,
      required: false,
    },
  },
};

const phoneConstraints = {
  foo: {
    presence: {
      presence: true,
      message: 'Please fill in your phone number',
    },
    format: {
      pattern: '^[0-9]{9,12}$',
      flags: 'i',
      message: 'Incorrect phone number',
    },
  },
};

const usernameConstraints = {
  foo: {
    presence: {
      presence: true,
      message: 'Usuario Requerido',
    },
    format: {
      // pattern: '^[_a-zA-Z0-9-.]+$', // Este si funciona omitiendo ^
      pattern: '^[_A-z0-9-.]*((-|s)*[_A-z0-9-.@])*$',
      flags: 'i',
      message: 'El valor ingresado es incorrecto',
    },
  },
};

const textConstraints = {
  foo: {
    presence: {
      presence: true,
      message: 'Debe ingresar un valor alfanumerico (-, _, ., $)',
    },
    format: {
      pattern: '^[_a-zA-Z0-9 -.]+$',
      flags: 'i',
      message: 'El valor ingresado es incorrecto',
    },
    length: {
      maximum: 180,
      message: `Longitud máxima: ${180}`,
    },
  },
};

const integerConstraints = {
  foo: {
    presence: {
      presence: true,
      message: 'Debe ingresar un número entero',
    },
    format: {
      pattern: '^[1-9][0-9]*$', // ^[-+]?\d+$
      flags: 'i',
      message: 'El valor ingresado es incorrecto',
    },
    length: {
      maximum: 14,
      message: `Longitud máxima: ${14}`,
    },
  },
};

const integerWithZeroConstraints = {
  foo: {
    presence: {
      presence: true,
      message: 'Debe ingresar un número entero',
    },
    format: {
      pattern:
        '^(\\d|\\d{1,9}|1\\d{1,9}|20\\d{8}|213\\d{7}|2146\\d{6}|21473\\d{5}|214747\\d{4}|2147482\\d{3}|21474835\\d{2}|214748364[0-7])$',
      flags: 'i',
      message: 'El valor ingresado es incorrecto',
    },
    length: {
      maximum: 14,
      message: `Longitud máxima: ${14}`,
    },
  },
};

const decimalPoint2Constraints = {
  foo: {
    presence: {
      presence: true,
      message: 'Debe ingresar un número decimal',
    },
    format: {
      pattern: '^\\d+\\.?\\d{0,2}$', // ^\d+\.?\d{0,2}$
      flags: 'i',
      message: 'El valor ingresado es incorrecto',
    },
    length: {
      maximum: 14,
      message: `Longitud máxima: ${14}`,
    },
  },
};

const passwordConstraints = {
  foo: {
    presence: {
      presence: true,
      message: 'This field is empty',
    },
    length: {
      minimum: 6,
      message: 'Must be at least 6 characters',
    },
  },
};

const requiredConstraints = {
  foo: {
    presence: {
      presence: true,
      allowEmpty: false,
      message: 'Requerido',
    },
  },
};

const confirmPasswordConstraints = {
  foo2: {
    equality: 'foo',
  },
};

const SupportValidator = {
  // Most validate function receive a value (or a group of value) and return undefined if there is no error,
  // Otherwise, return a string as a error (or a array of strings for multi errors);

  /**
   * Check a string as email
   *
   * @param {string} input
   * @returns undefined as true, string as false
   */
  checkEmail(input) {
    return facade(emailConstraints, input);
  },

  /**
   * Check a string as phone
   *
   * @param {string} input
   * @returns undefined as true, string as false
   */
  checkPhone(input) {
    return facade(phoneConstraints, input);
  },

  checkPassword(password) {
    return facade(passwordConstraints, password);
  },

  checkConfirmPassword(password, confirmPassword) {
    return facade(confirmPasswordConstraints, password, confirmPassword);
  },

  checkUsername(username) {
    return facade(usernameConstraints, username);
  },

  checkInteger(value) {
    return facade(integerConstraints, value);
  },

  checkIntegerWithZero(value) {
    return facade(integerWithZeroConstraints, value);
  },

  checkDecimalPoint2(value) {
    return facade(decimalPoint2Constraints, value);
  },

  checkText(value) {
    return facade(textConstraints, value);
  },

  checkRequired(value) {
    return facade(requiredConstraints, value);
  },

  checkSumOneHundred(value) {
    return facade(sumOneHundredConstraints, value);
  },

  checkSumNumbersConstraints(value) {
    return facade(sumNumbersConstraints, value);
  },

  checkSumSelectedOneHundredConstraints(value) {
    return facade(sumSelectedOneHundredConstraints, value);
  },
};

/**
 * Use to shorten common validate code
 *
 * @param {string} input
 * @param {object} constraints
 * @returns undefined as true, string as false
 */
const facade = (constraints, input, input2 = undefined) => {
  let result;
  if (input2 !== undefined) result = validate({ foo: input, foo2: input2 }, constraints);
  else result = validate({ foo: input }, constraints);
  return result === undefined ? result : removeFirstWord(result.foo[0]);
};

/**
 * Because this lib return the field name in error string. I need to cut it out.
 *
 * @param {string} result
 * @returns result without headed error name
 */
const removeFirstWord = result => result.substr(result.indexOf(' ') + 1);

export default SupportValidator;
