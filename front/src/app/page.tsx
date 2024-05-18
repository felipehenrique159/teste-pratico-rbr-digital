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
  Button, Flex, Spinner,
  Text
} from '@chakra-ui/react'
import { SmallAddIcon } from '@chakra-ui/icons'
import Link from 'next/link'

export default function Home() {
  interface Funcionario {
    _id: string,
    nome: string,
    cargo: string,
    departamento: string,
  }

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const buscarTodosFuncionarios = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:3001/api/employees")
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
        method: 'DELETE'
      });
      const data = await response.json()
      console.log(data);
      await buscarTodosFuncionarios()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    buscarTodosFuncionarios()
  }, [])

  return (
    <Flex minWidth='max-content' gap='2' justifyContent="center" direction={'column'} marginTop="10%">
      <Flex minWidth='max-content' alignItems='center' gap='2' justifyContent="center">
        <Link href="/novo">
          <Button colorScheme='green' onClick={buscarTodosFuncionarios}><SmallAddIcon /> Novo funcionário</Button>
        </Link>
      </Flex>
      <Flex minWidth='max-content' alignItems='center' gap='2' justifyContent="center">
        {isLoading ? (
          <Spinner size="xl" marginTop={20} />
        ) : (
          <TableContainer>
            <Table variant='simple'>
              <TableCaption>Lista de Funcionários</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Cargo</Th>
                  <Th>Departamento</Th>
                  <Th>Ação</Th>
                </Tr>
              </Thead>
              <Tbody>
                {funcionarios.length === 0 ? (
                  <Tr>
                    <Td colSpan={2}>
                      <Text>Nenhum funcionário encontrado.</Text>
                    </Td>
                  </Tr>
                ) : (
                  funcionarios.map(funcionario => (
                    <Tr key={funcionario._id}>
                      <Td>{funcionario.nome}</Td>
                      <Td>{funcionario.cargo}</Td>
                      <Td>{funcionario.departamento}</Td>
                      <Td>
                        <Link href={`/editar/${funcionario._id}`}>
                          <Button colorScheme='blue'>Editar</Button>
                        </Link>
                        <Button colorScheme='red' marginLeft={2} onClick={() => excluirFuncionario(funcionario._id)}>
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
