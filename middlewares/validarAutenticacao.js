const autenticacao = true;

export const validarAutenticacao = (req, res, next) => {
    if (!autenticacao) {
      return res.status(401).json({ message:"Usuário não autenticado!" })
    }
    next();
  };

