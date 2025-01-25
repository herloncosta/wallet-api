import { app, prisma } from './app'

const PORT = process.env.PORT || 3001

prisma
    .$connect()
    .then(() => {
        console.log('Conectado ao PostgreSQL com Prisma')
    })
    .catch((err) => {
        console.error('Erro na conexão com o PostgreSQL:', err)
    })

process.on('SIGINT', async () => {
    await prisma.$disconnect()
    process.exit(0)
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
