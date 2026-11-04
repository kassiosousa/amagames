# Spec-driven development — AMAGAMES

Nenhuma mudança relevante entra no código sem passar por este fluxo. A spec é a fonte da verdade; o código a implementa.

## Fluxo

1. **Constitution** (`constitution.md`): princípios que valem para todo o projeto. Muda raramente.
2. **Spec** (`NNN-nome/spec.md`): *o quê* e *por quê*. Requisitos, cenários de aceite, fora de escopo. Sem decisões de tecnologia.
3. **Plan** (`plan.md`): *como*. Arquitetura, arquivos afetados, modelo de dados, riscos.
4. **Tasks** (`tasks.md`): lista ordenada e verificável, cada tarefa ligada a requisitos (RF-xx).
5. **Implementação**: marque as tarefas conforme conclui; se o código divergir da spec, atualize a spec primeiro.

## Estrutura

```
specs/
  README.md
  constitution.md
  _templates/        spec.md · plan.md · tasks.md
  001-site-institucional/
    spec.md  plan.md  tasks.md  research.md
```

## Regras

- Uma pasta por feature, numerada em sequência (`002-area-do-associado`, ...).
- Pontos desconhecidos ficam como `[A CONFIRMAR]` na spec, nunca inventados.
- Todo requisito tem ID (`RF-01`, `RNF-01`) e ao menos um critério de aceite.
- Uma tarefa só é concluída quando `npm run build` passa e o critério de aceite foi verificado.
