import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    
    const balance = transactionsRepository.getBalance();

    return response.json({
      transactions,
      balance,
    })
    
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    
    const {title, value, type} = request.body;
// criando transacao, cuida da regra de negócio
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );
//executar a transacao com o metodo execute
    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });
    // retorna o valor da transaction
    return response.json(transaction);

  } catch (err) {
    return response.status(400).json({error: err.message });
  }
});

export default transactionRouter;
