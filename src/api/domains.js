const domains = [
  {
    name: '国内线路',
    value: 'https://mtdhb.z.xxooweb.com/'
  },
  {
    name: '海外线路',
    value: 'https://api.mtdhb.com/'
  }
];

const domain = domains[localStorage.getItem('domain') || 0].value;

export default domains;
export {domain};
