# React Testing Library + Jest - Como configurar

1 - npm install --save-dev jest

2 - npx jest --init

3 - npm install --save-dev ts-node

4 - npm install --save-dev @types/jest

5 - npm install --save-dev jest-environment-jsdom

## Iniciando com jest

* Um arquivo de teste pode tanto usar o .test. quanto o .spec. Ex: App.test.tsx | App.spec.tsx

### Primeiro teste

```tsx
test("sum", () => {
  expect(1 + 1).toBe(2);
});
```

### Agora precisamos instalar o swc

```
npm install @swc/core @swc/jest -D
```

*  **@swc/core:** é uma alternativa popular ao Babel responsável pela compilação de código JavaScript/TypeScript
*  **@swc/jest:** fornece integração com o Jest

#### Configurando o jest.config.ts

Adicione o código abaixo em seu arquivo jest.config.ts

```ts
transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators: true,
          },
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            react: {
              runtime: "automatic",
            },
          },
        },
        module: {
          type: "es6",
          noInterop: false,
        },
      },
    ],
  },
```

### Agora precisamos instalar as dependências do React testing library
```
npm i @testing-library/jest-dom @testing-library/react @testing-library/user-event -D
```

### Porque preciso do React Testing Library?

Por padrão, o Jest não vem com entendimento do react em si, ou seja, não é possível testar os componentes react apenas com jest

### Primeiro teste usando React Testing Library

```tsx
import { render } from "@testing-library/react";
import { Button } from "./components/Button";

test("test", () => {
  const { getByText } = render(<Button />);

  const button = getByText("Comprar");

  expect(button).toBeTruthy();
});

```

### Fazendo asserções em HTML em seus testes

Para permitir asserções em HTML renderizado em seus testes, primeiro iremos criar uma pasta com nome test dentro da pasta ***src*** do projeto. Dentro desta pasta iremos criar um arquivo setup.ts com o seguinte conteúdo:

```ts
import "@testing-library/jest-dom";
```

Agora, dentro do arquivo ***jest.config.ts***, iremos buscar a propriedade ***setupFilesAfterEnv*** e adicionar o seguinte código:

```ts
setupFilesAfterEnv: [
  "<rootDir>/src/test/setup.ts"
],
```

Agora nós teremos acesso à alguns métodos como por exemplo o ***.toHaveAttribute*** e o ***.toBeInTheDocument()***

* Exemplo de código:

```tsx
describe("Button component", () => {
  it("Should render a button component", () => {
    const { getByText } = render(<Button />);

    expect(getByText("Comprar agora")).toHaveAttribute("class", "test");
  });
});
```

***OBS:*** Deve-se usar atributos do html em si, e não os do react.
EXEMPLO:
* .toHaveAttribute("class", "test") -> (✔)
* .toHaveAttribute("className", "test") -> (❌)