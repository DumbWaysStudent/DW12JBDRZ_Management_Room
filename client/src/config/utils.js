export const isValidEmail = email => {
  const filter = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  return String(email).search(filter) != -1;
};

export const checkSecurePass = isSecure => {
  const data = {
    icEye: isSecure ? 'eye-slash' : 'eye',
    securePass: !isSecure,
  };

  return data;
};

/**
 * const text = textEllipsis('a very long text', 10);
 * "a very ..."
 * const text = textEllipsis('a very long text', 10, { side: 'start' });
 * "...ng text"
 * const text = textEllipsis('a very long text', 10, { textEllipsis: ' END' });
 * "a very END"
 */
export const textEllipsis = (
  str,
  maxLength,
  {side = 'end', ellipsis = '...'} = {},
) => {
  if (str.length > maxLength) {
    switch (side) {
      case 'start':
        return ellipsis + str.slice(-(maxLength - ellipsis.length));
      case 'end':
      default:
        return str.slice(0, maxLength - ellipsis.length) + ellipsis;
    }
  }
  return str;
};
