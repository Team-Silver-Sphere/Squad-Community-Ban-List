function validSteam64ID(input) {
  return input && input.match(/^[0-9]{17}$/);
}

export { validSteam64ID };
