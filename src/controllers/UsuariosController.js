const Yup = require("yup");
const Usuario = require("../entities/Usuario");
const BusinessException = require("../common/exceptions/BusinessException");

const validadorDeSchemaSaveOrUpdate = Yup.object().shape({
  nome: Yup.string().min(6).required(),
  email: Yup.string().email(),
  senha: Yup.string().required(),
});

class UsuariosController {
  async store(req, res) {
    await validadorDeSchemaSaveOrUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { nome, email, senha } = req.body;

    const countPorEmail = await Usuario.count({
      where: {
        email,
      },
    });

    if (countPorEmail > 0) {
      throw new BusinessException("E-mail já utilizado", "USU_01");
    }

    await Usuario.create({ nome, email, senha });

    res.send();
  }
}

module.exports = new UsuariosController();