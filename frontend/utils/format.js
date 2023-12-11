export const formatAddress = (address) => {
  if(address.length === 42){
    return address.substring(0,5) + "..." + address.substring(37,42);
  }
  return address;
}