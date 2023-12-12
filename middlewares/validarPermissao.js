const permissao = "admin";

export const validarPermissao = (req, res, next) => {
    if (permissao !== "admin") {
      return res.status(403).json({ message:"Usuário não possui autorização suficiente!" })
    }
    next();
  };

export const validarPermissaoFinanceiro = (req, res, next) => {
    if (permissao !== "financeiro") {
      return res.status(403).json({ message:"Usuário não possui autorização suficiente!" })
    }
    next();
};

export const validarPermissaoVendedor = (req, res, next) => {
  if (permissao !== "vendedor") {
    return res.status(403).json({ message:"Usuário não possui autorização suficiente!" })
  }
  next();
};