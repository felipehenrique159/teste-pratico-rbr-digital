'use client'
import { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Flex,
  Spinner,
  Text,
  Input,
  Box,
} from '@chakra-ui/react'
import { SmallAddIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import Link from 'next/link'
interface Funcionario {
  _id: string
  nome: string
  cargo: string
  departamento: string
}

export default function Home() {

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [chaveOrdenacao, setChaveOrdenacao] = useState('')
  const [direcaoOrdenacao, setDirecaoOrdenacao] = useState<'asc' | 'desc'>('asc')

  const buscarTodosFuncionarios = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:3001/api/employees')
      const data = await response.json()
      setFuncionarios(data.funcionarios)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const excluirFuncionario = async (idFuncionario: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/employees/${idFuncionario}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      await buscarTodosFuncionarios()
    } catch (error) {
      console.log(error)
    }
  }

  const ordenar = (key: string) => {
    if (key === chaveOrdenacao) {
      setDirecaoOrdenacao(direcaoOrdenacao === 'asc' ? 'desc' : 'asc')
    } else {
      setChaveOrdenacao(key)
      setDirecaoOrdenacao('asc')
    }
  }

  useEffect(() => {
    buscarTodosFuncionarios()
  }, [])

  let funcionariosFiltrados = funcionarios.filter(funcionario =>
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (chaveOrdenacao) {
    funcionariosFiltrados = funcionariosFiltrados.sort((a, b) => {
      const valorA = a[chaveOrdenacao]
      const valorB = b[chaveOrdenacao]
      if (valorA < valorB) return direcaoOrdenacao === 'asc' ? -1 : 1
      if (valorA > valorB) return direcaoOrdenacao === 'asc' ? 1 : -1
      return 0
    })
  }

  return (
    <Flex minWidth="max-content" gap="2" justifyContent="center" direction={'column'} marginTop="10%">
      <Flex minWidth='max-content' alignItems='center' gap='2' justifyContent="center" direction="column">
        <Link href="/novo">
          <Button colorScheme='green' onClick={buscarTodosFuncionarios}><SmallAddIcon /> Novo funcionário</Button>
        </Link>
        <Input
          placeholder="Pesquisar funcionário"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          maxWidth="40%"
        />
      </Flex>
      <Flex minWidth="max-content" alignItems="center" gap="2" justifyContent="center">
        {isLoading ? (
          <Spinner size="xl" marginTop={20} />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Lista de Funcionários</TableCaption>
              <Thead>
                <Tr>
                  <Th onClick={() => ordenar('nome')} cursor="pointer">
                    Nome
                    {chaveOrdenacao === 'nome' && (
                      <Box as="span" ml="2">
                        {direcaoOrdenacao === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </Box>
                    )}
                  </Th>
                  <Th onClick={() => ordenar('cargo')} cursor="pointer">
                    Cargo
                    {chaveOrdenacao === 'cargo' && (
                      <Box as="span" ml="2">
                        {direcaoOrdenacao === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </Box>
                    )}
                  </Th>
                  <Th onClick={() => ordenar('departamento')} cursor="pointer">
                    Departamento
                    {chaveOrdenacao === 'departamento' && (
                      <Box as="span" ml="2">
                        {direcaoOrdenacao === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </Box>
                    )}
                  </Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>
              <Tbody>
                {funcionariosFiltrados.length === 0 ? (
                  <Tr>
                    <Td colSpan={4}>
                      <Text>Nenhum funcionário encontrado.</Text>
                    </Td>
                  </Tr>
                ) : (
                  funcionariosFiltrados.map(funcionario => (
                    <Tr key={funcionario._id}>
                      <Td>{funcionario.nome}</Td>
                      <Td>{funcionario.cargo}</Td>
                      <Td>{funcionario.departamento}</Td>
                      <Td>
                        <Link href={`/editar/${funcionario._id}`}>
                          <Button colorScheme="blue">Editar</Button>
                        </Link>
                        <Button
                          colorScheme="red"
                          marginLeft={2}
                          onClick={() => excluirFuncionario(funcionario._id)}
                        >
                          Excluir
                        </Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Flex>
    </Flex>
  )
}