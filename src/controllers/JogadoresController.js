const Yup = require("yup");
const Time = require('../entities/Time');
const Jogador = require("../entities/Jogador");
const BusinessException = require("../common/exceptions/BusinessException");

const validadorDeSchemaSaveOrUpdate = Yup.object().shape({
  nome: Yup.string().min(6).required(),
  apelido: Yup.string().required(),
  id_time: Yup.number().required(),
});

class JogadorController {

  async index (req, res) {
    const result = await Jogador.findAll({ include: [Time] });
    res.json(result);
  }

  async show (req, res) {
    const { id } = req.params;

    const result = await Jogador.findOne({
        where: {
          id,
        },
        include: [Time],        
      });

    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  }

  async store(req, res) {
    await validadorDeSchemaSaveOrUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { nome, apelido, id_time } = req.body;

    const time = await Time.findByPk(id_time);
    console.log("================================");
    console.log("time", time);
    console.log("================================");

    if (!time) {
      throw new BusinessException("Time não encontrado", "JOG_01");
    }

    await Jogador.create({ nome, apelido, id_time});

    res.sendStatus(201).json({id: id_time});
  }

  async update(req, res) {
    await validadorDeSchemaSaveOrUpdate.validate(req.body, {
      abortEarly: false,
    });

    const { id } = req.params;

    const jogador = await Jogador.findByPk(id);

    if (jogador) {
      const { nome, apelido, id_time } = req.body;

      await jogador.update({
         nome,
         apelido,
         id_time,
      });

      res.send();
    } else {
      res.sendStatus(404);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    const jogador = await Jogador.findByPk(id);

    if (jogador) {
      await jogador.destroy();
      res.send();
    } else {
      res.sendStatus(404);
    }
  }

}

module.exports = new JogadorController();