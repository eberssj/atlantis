import React, { useEffect, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Cliente, mockBuscarClientes, AcomodacaoTipo } from '../../../services/mockApi';
import './Dashboard.css';

Chart.register(...registerables); // Registra todos os elementos necessários

const Dashboard: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [dependentesTotal, setDependentesTotal] = useState<number>(0);

  useEffect(() => {
    const fetchClientes = async () => {
      const clientesData = await mockBuscarClientes();
      setClientes(clientesData);

      const totalDependentes = clientesData.reduce(
        (total, cliente) => total + (cliente.dependentes ? cliente.dependentes.length : 0),
        0
      );
      setDependentesTotal(totalDependentes);
    };
    
    fetchClientes();
  }, []);

  const acomodacaoData = clientes.reduce((acc: Record<AcomodacaoTipo, number>, cliente) => {
    if (cliente.acomodacao) {
      acc[cliente.acomodacao] = (acc[cliente.acomodacao] || 0) + 1;
    }
    return acc;
  }, {} as Record<AcomodacaoTipo, number>);

  const acomodacaoChartData = {
    labels: Object.keys(acomodacaoData),
    datasets: [
      {
        label: 'Distribuição de Acomodações',
        data: Object.values(acomodacaoData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const clienteAges = clientes.map(cliente => calculateAge(cliente.dataNascimento));
  const averageAge = clienteAges.reduce((a, b) => a + b, 0) / clienteAges.length || 0;

  return (
    <div className="dashboard">
      <h1>Dashboard de Clientes e Acomodações</h1>
      
      <div className="dashboard-counters">
        <div className="counter">
          <h2>Total de Clientes</h2>
          <p>{clientes.length}</p>
        </div>
        <div className="counter">
          <h2>Total de Dependentes</h2>
          <p>{dependentesTotal}</p>
        </div>
        <div className="counter">
          <h2>Idade Média dos Clientes</h2>
          <p>{averageAge.toFixed(1)} anos</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart">
          <h3>Distribuição de Acomodações</h3>
          <Doughnut data={acomodacaoChartData} />
        </div>

        <div className="chart">
          <h3>Idades dos Clientes</h3>
          <Bar
            data={{
              labels: clientes.map(cliente => cliente.nome),
              datasets: [
                {
                  label: 'Idade',
                  data: clienteAges,
                  backgroundColor: '#36A2EB',
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
