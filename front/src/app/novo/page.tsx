'use client'
import { useState } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text
} from '@chakra-ui/react'
import { FaUserPlus  } from "react-icons/fa";
import { navegarParaHome } from '../actions';
import Link from 'next/link';

interface Funcionario {
  nome: string,
  cargo: string,
  departamento: string,
}

export default function NovoFuncionario() {
  const [nome, setNome] = useState<string>('')
  const [cargo, setCargo] = useState<string>('')
  const [departamento, setDepartamento] = useState<string>('')

  const [nomeErro, setNomeErro] = useState<boolean>(false)
  const [cargoErro, setCargoErro] = useState<boolean>(false)
  const [departamentoErro, setDepartamentoErro] = useState<boolean>(false)

  const criarFuncionario = async() => {

    await validarCamposObrigatorios()

    if (nome == '' || cargo == '' || departamento == '') {
      return
    }

    const novoFuncionario: Funcionario  = {
      nome: nome,
      cargo: cargo,
      departamento: departamento
    }

    try {
      const response = await fetch(`http://localhost:3001/api/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoFuncionario)
      });

      const data = await response.json()

      if (data.funcionario) {
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
          <FaUserPlus  size={100}/>
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
          <Button colorScheme="blue" mt={4} onClick={criarFuncionario}>
            Cadastrar Funcionário
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
