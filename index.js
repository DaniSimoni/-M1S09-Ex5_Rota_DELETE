/* Para melhorar ainda mais a API do projeto Trindade Places, é necessário implementar uma rota DELETE. Essa rota deve permitir aos usuários excluir uma instituição pública específica da base de dados. Para isso, é preciso definir um identificador único para cada instituição, que será utilizado na requisição de exclusão.

A rota DELETE pode ser implementada com o path /places/:id, onde o parâmetro :id representa o identificador único da instituição. Ao receber uma requisição DELETE com esse path, a API deve verificar se o identificador corresponde a uma instituição válida na base de dados e, em caso positivo, excluí-la.

A implementação da rota DELETE é essencial para permitir que os usuários tenham controle sobre as informações presentes na base de dados, garantindo a integridade e a atualização dos dados. Além disso, essa rota é importante para manter a transparência e a eficiência na gestão dos serviços públicos, permitindo que as instituições sejam atualizadas ou excluídas quando necessário.
*/

const express = require('express');
const connection = require('./src/database');
const Place = require('./src/models/places');

const app = express();

app.use(express.json());        

connection.authenticate();
connection.sync({alter: true})
console.log('API ON') 

app.listen(3333, () => {
    console.log('SERVIDOR ON!')
}); 


app.post('/places', async (req, res) => {

    try {
         const place = {

        name: req.body.name,
       
        numberPhone: req.body.numberPhone,
  
        openingHours: req.body.openingHours,
  
        description: req.body.description,
 
        latitude: req.body.latitude,   
    
        longitude: req.body.longitude,
      }

         const newPlace = await Place.create(place)

             res.status(201).json(newPlace)

    } catch (error) {
        res.status(400).json({message: error.message})
    }
});


app.get('/places', async (req, res) => {
    try {

        const places = await Place.findAll()
        return res.json(places) 
    } 
    catch (error) {
        res.status(500).json({message: 'Não há dados'})
    }

})


app.delete('/places/:id', async (req, res) => {
    try {
      const place = await Place.findByPk(req.params.id);
      if (!place) {
        return res.status(404).json({ message: 'Local não encontrado' });
      }
      await place.destroy();
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



