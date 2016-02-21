Eliding GWT Bean Validation Names

Lots of

var ARc = "javax_validation_constraints_Future_message";
/** @type {string} */
var CRc = "javax_validation_constraints_Max_message";
/** @type {string} */
var DRc = "javax_validation_constraints_Min_message";



And

/** @type {string} */
var XRc = "org_hibernate_validator_constraints_Range_message";
/** @type {string} */
var ZRc = "org_hibernate_validator_constraints_ScriptAssert_message";
/** @type {string} */
var _Rc = "org_hibernate_validator_constraints_URL_message"

Do we need all of these client side, or can they be elided?
