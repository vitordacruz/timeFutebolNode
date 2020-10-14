const Yup = require("yup");
const Time = require("../entities/Time");
const BusinessException = require("../common/exceptions/BusinessException");

const validadorDeSchemaSaveOrUpdate = Yup.object().shape({
  nome: Yup.string().min(6).required(),
  cidadeEstado: Yup.string().required(),
});

class TimesController {
  async store(req, res) {
    await validadorDeSchemaSaveOrUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { nome, cidadeEstado } = req.body;

    const countNome = await Time.count({
      where: {
        nome,
      },
    });

    if (countNome > 0) {
      throw new BusinessException("Nome do time já utilizado", "TIM_01");
    }

    await Time.create({ nome, cidadeEstado });

    res.send();
  }
}

module.exports = new TimesController();