interface IMailConfig{
  driver: 'ethereal' | 'ses';

  defauts:{
    from:{
      email:string;
      name: string;
    }
  };
}

export default {
    driver:process.env.APP_MAIL_DRIVER || 'ethereal',

    defauts:{
      from:{
        email:'suporte@100pay.org',
        name: '100Pay Adm.'
      }
    },
} as IMailConfig
