<small>(for the English version, <a href="#en">click here</a>)</small>

![Prévia da página - Preview of the page](./preview.gif)

# To-do List
<h2>:brazil: Português</h2>
<p id="pt">Projeto de HTML, CSS e JavaScript desenvolvido por mim (<a href="https://www.linkedin.com/in/raphaelameidamartins/" target="_blank" rel="external">Raphael Martins</a>) ao final do Bloco 5 do Módulo 1 do curso de Desenvolvimento Web da <a href="https://www.betrybe.com" targe="_blank" rel="nofollow">Trybe</a>. Obtive aprovação com 100% dos requisitos obrigatórios e opcionais atingidos, e seguindo as todas as regras de padronização do código e boas práticas do Linter.</p>
<p>O projeto consistiu no desenvolvimento de uma página web dinâmica e interativa em que a pessoa usuária pode adicionar itens a uma lista de tarefas, alterar a ordem deles, marcá-los como concluídos ou excluí-los. Também é possível salvar para que ao acessar a página novamente, a lista esteja como foi deixada.</p>
<p><a href="https://raphaelalmeidamartins.github.io/project-to-do-list/" target="_blank">Clique aqui</a> para conferir o resultado do projeto no navegador.</p>

![Minha nota no projeto - My grade of the project](./nota.png)

### Requisitos
<ol>
  <li>Adicione à sua lista o título <em>"Minha Lista de Tarefas"</em> em uma tag</li>
  <li>Adicione abaixo do título um pequeno e discreto parágrafo com <code>id="funcionamento"</code> e com o texto <em>"Clique duas vezes em um item para marcá-lo como completo"</em></li>
  <li>Adicione um input com o <code>id="texto-tarefa"</code> em que a pessoa usuária poderá digitar o nome do item que deseja adicionar à lista</li>
  <li>Adicione uma lista ordenada de tarefas com o <code>id="lista-tarefas"</code></li>
  <li>Adicione um botão com <code>id="criar-tarefa"</code> e, ao clicar nesse botão, um novo item deverá ser criado ao final da lista e o texto do input deve ser limpo</li>
  <li>Ordene os itens da lista de tarefas por ordem de criação</li>
  <li>Clicar em um item da lista deve alterar a cor de fundo do item para cinza <code>rgb(128,128,128)</code></li>
  <li>Não deve ser possível selecionar mais de um elemento da lista ao mesmo tempo</li>
  <li>Clicar duas vezes em um item, faz com que ele seja riscado, indicando que foi completo. Deve ser possível desfazer essa ação clicando novamente duas vezes no item
    <ul>
      <li>Crie uma classe CSS com o nome <code>"completed"</code> e defina a propriedade <code>text-decoration</code> com o valor <code>line-through</code>.</li>
      <li>Utilize a classe CSS <code>"completed"</code> para adicionar o efeito de letra tachada (riscada) às tarefas finalizadas.</li>
    </ul>
  </li>
  <li>Adicione um botão com <code>id="apaga-tudo"</code> que quando clicado deve apagar todos os itens da lista</li>
  <li>Adicione um botão com <code>id="remover-finalizados"</code> que quando clicado remove somente os elementos finalizados da sua lista</li>
</ol>

### Bônus
<ol start="12">
  <li>Adicione um botão com <code>id="salvar-tarefas"</code> que salve o conteúdo da lista. Se você fechar e reabrir a página, a lista deve continuar no estado em que estava</li>
  <li>Adicione dois botões, um com <code>id="mover-cima"</code> e outro com <code>id="mover-baixo"</code>, que permitam mover o item selecionado para cima ou para baixo na lista de tarefas
    <ul>
      <li>Antes de começar a desenvolver essa funcionalidade, pare e pense: o que significa mover um item de uma lista para cima ou para baixo no <strong><em>DOM</em></strong>? Você já possui todas as habilidades necessárias para fazer isso.</li>
      <li>Habitue-se a pensar nos casos especiais ao construir programas. O que acontece se o usuário tentar mover o primeiro item para cima ou o último para baixo?</li>
    </ul>
  </li>
  <li>Adicione um botão com <code>id="remover-selecionado"</code> que, quando clicado, remove o item selecionado</li>
</ol>
<br>

<h2 id="en">:us: English</h2>
<p>Project of HTML, CSS and JavaScript develop by me (<a href="https://www.linkedin.com/in/raphaelameidamartins/" target="_blank" rel="external">Raphael Martins</a>) in the end of the Unit 5 Module 1 of the Web Development course at <a href="https://www.betrybe.com" targe="_blank" rel="nofollow">Trybe</a>. I was approved with 100% of the mandatory and optional requirements met, and following all the Linter rules of best practices and code standardization.</p>
<p>We had to develop a dynamic and interactive web page that the user can add items to a to-do list, change their order, mark them as completed or delete them. It's also possible to save the list, so when the user enters the page again, it is the same way as it was left.</p>
<p><a href="https://raphaelalmeidamartins.github.io/project-to-do-list/" target="_blank">Click here</a> to check out the final version of the project on your browser.</p>

![My grade of the project - Minha nota no projeto](./nota.png)

### Requirements
<ol>
  <li>Add to your list the title <em>"Minha Lista de Tarefas"</em> (<em>"My To-do List"</em>) in a tag</li>
  <li>Right below the title, add a small paragraph with <code>"funcionamento"</code> as its id, and with the text <em>"Clique duas vezes em um item para marcá-lo como completo"</em> (<em>"Click twice in a item to mark it as completed"</em>)</li>
  <li>Add an input elemen with <code>id="texto-tarefa"</code> that the user can type the task they want to add to the list</li>
  <li>Add an ordered list with <code>id="lista-tarefas"</code></li>
  <li>Add a button element with <code>id="criar-tarefa"</code>, and when it's clicked, a new item should be added to the end of the list and the input should be cleaned</li>
  <li>Sort the list items by creation order</li>
  <li>Clicking in a list item should change its background color to gray <code>rgb(128,128,128)</code></li>
  <li>It shouldn't be possible to select more than one list item per time</li>
  <li>Clicking twice in a list item, should strike out the item marking it as completed. Cliking twice in the same item again should undo this action
    <ul>
      <li>Create a CSS class named <code>"completed"</code>  and define the property <code>text-decoration</code> with the value <code>line-through</code>.</li>
      <li>Use this class to add the effect struck out word to the completed tasks.</li>
    </ul>
  </li>
  <li>Add a button elemnt with <code>id="apaga-tudo"</code> that when it's clicked all the list items are deleted</li>
  <li>Add a button element with <code>id="remover-finalizados"</code> that when it's clicked all the items marked as completed are deleted</li>
</ol>

### Bonus
<ol start="12">
  <li>Add a button element with <code>id="salvar-tarefas"</code> that when it's clicked the list content is saved. If you enter the page again, the list should stay the same way it was left</li>
  <li>Add two button elements, on with <code>id="mover-cima"</code> and the other with <code>id="mover-baixo"</code>. When they are clicked, the selected item should be moved to above or below in the to-do list
    <ul>
      <li>Before starting the development of this feature, stop and think: what does it mean to move an item to above or to below in the <strong><em>DOM</em></strong>? You've already have all the skills needed to be able to do that.</li>
      <li>Consider all scenarios when you are developing a program. What happens if the user try to move the first item to above or the last item to below?</li>
    </ul>
  </li>
  <li>Add a button element with <code>id="remover-selecionado"</code>, that when it's clicked it removes the selected item</li>
</ol>
