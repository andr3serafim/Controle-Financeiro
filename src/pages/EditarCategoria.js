import React, { useState, useEffect } from 'react';

import api from '../services/Api';

import { useParams, useNavigate  } from 'react-router-dom';

function EditCategoria() {
    const { categoriaId } = useParams();
    const [nome, setNome] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchCategoria() {
            try {
                const response = await api.get(`/categorias/${categoriaId}`);
                setNome(response.data.nome);
            } catch (error) {
                console.error("Erro ao buscar a categoria: ", error);
            }
        }

        fetchCategoria();
    }, [categoriaId]);

    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
            await api.put(`/categorias/${categoriaId}`, { nome });
            alert('Categoria atualizada com sucesso!');
            navigate('/categorias');
        } catch (error) {
            console.error("Erro ao atualizar categoria: ", error);
            const errorMessage = error.response && error.response.data.message ? error.response.data.message : 'Erro ao atualizar. Verifique os dados e tente novamente.';
            alert(errorMessage);
        }
    }

    return (
        <div>
            <h2>Editar Categoria</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
}

export default EditCategoria;
