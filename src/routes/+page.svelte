<!-- src/routes/index.svelte -->
<script>
  const calcButtons = [
    ["C", "+ -", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ].flat();

 let userInput = "0";

   async function calculate() {
    try {
      // will try to run the code block
      const response = await fetch("/api/calc", {
        // making request to server using fetch
        method: "POST",
        body: JSON.stringify({ userInput }), //making a json representation of userInput
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json(); //revcieving data from server
      userInput = data.result;
    } catch {
      // catch error
      console.error("Error:");
      userInput = "Error calculating";
    }
  }

 
 function onClick(button) {
    if (!isNaN(button)) {
      userInput = userInput == 0 ? button : userInput + button;
    } else {
      switch (button) {
        case "C":
          userInput = "0";
          break;

        case "+ -":
          userInput *= -1;
          break;

        case "%":
          userInput *= 0.1;
          break;

        case "=":
          calculate(); // running the async function when click
          break;

        default:
          const lastChar = userInput[userInput.length - 1];
          const isOperator = /[*/+\-.]/.test(lastChar);
      //checking if the last input is operator or period
          if (isOperator) {
            userInput = userInput.slice(0, -1) + button;
          } else {
            userInput += button;
          }
          break;
      }
    }
  }
 
</script>
  <h1 class="text-center italic text-4xl b">Simple Calculator</h1>
<main class="flex justify-center py-10">

   <div class=" min-h-max bg-gray-900  px-4 py-5 items-center  border-2 rounded-lg ">
  
    <input class=" h-20 bg-gray-500 text-4xl text-right text-white  px-2 py-1 border-3 rounded-lg mb-3" type="text" bind:value={userInput} readonly />
    <section class="grid grid-cols-4 gap-1 h-72 ">
      {#each calcButtons as buttons}
        {#if buttons === "="}
          <button
            class="col-span-2 bg-red-600 rounded-md"
            on:click={() => onClick(buttons)}>{buttons}</button
          >
        {:else}
          <button class="rounded-md bg-indigo-600 text-white   " on:click={() => onClick(buttons)}>{buttons}</button>
        {/if}
      {/each}
    </section>
     
  </div>
</main>
