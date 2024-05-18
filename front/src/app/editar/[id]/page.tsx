'use client'
import { useEffect, useState } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from '@chakra-ui/react'
import { FaUserEdit } from "react-icons/fa";
import Link from 'next/link';
import { navegarParaHome } from '@/app/actions';

interface Params {
  params: object
}

interface Funcionario {
  nome: string,
  cargo: string,
  departamento: string,
}

export default function EditarFuncionario({ params }: Params) {
  const [id, setId] = useState<string>('')
  const [nome, setNome] = useState<string>('')
  const [cargo, setCargo] = useState<string>('')
  const [departamento, setDepartamento] = useState<string>('')

  const [nomeErro, setNomeErro] = useState<boolean>(false)
  const [cargoErro, setCargoErro] = useState<boolean>(false)
  const [departamentoErro, setDepartamentoErro] = useState<boolean>(false)

  useEffect(() => {
    buscarFuncionarioPorId()
  }, []);

  async function buscarFuncionarioPorId() {
    try {
      const response = await fetch(`http://localhost:3001/api/employees/${params.id}`)
      const data = await response.json()
      setNome(data.nome)
      setCargo(data.cargo)
      setDepartamento(data.departamento)
      console.log(data);

    } catch (error) {
      console.log(error)
    }
  }

  const editarFuncionario = async () => {

    await validarCamposObrigatorios()

    if (nome == '' || cargo == '' || departamento == '') {
      return
    }

    const atualizarFuncionario: Funcionario = {
      nome: nome,
      cargo: cargo,
      departamento: departamento
    }

    try {
      const response = await fetch(`http://localhost:3001/api/employees/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(atualizarFuncionario)
      });

      const data = await response.json()

      if (data) {
        navegarParaHome()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const validarCamposObrigatorios = async () => {
    setNomeErro(false)
    setCargoErro(false)
    setDepartamentoErro(false)

    if (nome == '') {
      setNomeErro(true)
    }

    if (cargo == '') {
      setCargoErro(true)
    }

    if (departamento == '') {
      setDepartamentoErro(true)
    }
  }

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Flex direction="column" alignItems="center">
        <FaUserEdit size={100} />
        <FormControl id="nome" marginTop={10} isRequired>
          <FormLabel>Nome</FormLabel>
          <Input type="text" value={nome} onChange={(event) => setNome(event.target.value)} />
          {nomeErro && (
            <Text color="red" fontSize={10}>Campo obrigatório</Text>
          )}
        </FormControl>
        <FormControl id="cargo" isRequired>
          <FormLabel>Cargo</FormLabel>
          <Input type="text" value={cargo} onChange={(event) => setCargo(event.target.value)} />
          {cargoErro && (
            <Text color="red" fontSize={10}>Campo obrigatório</Text>
          )}
        </FormControl>
        <FormControl id="departamento" isRequired>
          <FormLabel>Departamento</FormLabel>
          <Input type="text" value={departamento} onChange={(event) => setDepartamento(event.target.value)} />
          {departamentoErro && (
            <Text color="red" fontSize={10}>Campo obrigatório</Text>
          )}
        </FormControl>
        <Button colorScheme="blue" mt={4} onClick={editarFuncionario}>
          Editar Funcionário
        </Button>
        <Link href="/">
          <Button colorScheme="red" mt={4}>
            Voltar para home
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}
