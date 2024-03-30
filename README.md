# HISTORY

In early June of 2023, I created this calculator app as the final project for the OP foundations course.
Fast-forward to the last two weekends of March 2024, after finishing the OP Javascript course (from the Javascript path), I decided to rework to this project, with more complex computer-science-y work now under my belt :)

# FEATURES OF THE REFACTOR

- Event-Driven Architecture: `initializeInput` allows one inputHandler to be bound to event listeners for both on-screen and keyboard interaction. This is leveraged by `calculatorInterface`, which calls initializeInput with its own handleInput function, loosely coupling user actions to data storage (in the state object), processing layer (triggered when the equals sign is clicked) and viewing layer (updated with every call to handleInput).

- Commander Design pattern: calculatorInterface's `userCommands` maps keys, such as Backspace, to their respective functions. Similarly, `keyBoardChar` allows for transformation of arithmetic operands into substitutes that are more familiar in source code (eg the multiplication sign becoming an asterisk). Through taking their own-properties as commands, these object literals enforce the Open-Closed design principle within handleInput, eliminating the need for high-maintenance conditional blocks.

- Single Source of Truth: the `initializeState` factory function only returns methods that define how external components can manipulate and read its state, without returning its actual state. Hence the state is a non-corruptible Single Source of Truth, as external components cannot bind data to it (only manipulate it with the established API the methods provide).

# Flexing my Computer Science Muscle: Order of Operations

- Previously, the calculator could only evaluate an expression in the form `<number><operator><number>`. But now it can precisely evaluate long, complex expressions by following the PEMDAS rule.

- The `CalculationTree` class encapsulates all this logic, taking in an expression string as a parameter for its constructor and creating an instance with tree and answer properties.

- `CalculationTree.tree` is a binary search tree where all the internal nodes are operators and all the leaves are numbers. The operators to be evaluated last in the expression are higher, while those to be operated last are deeper. This is done by buildTree.

- `CalculationTree.answer` is evaluated by the calculate method. It uses post-order transversal to first evaluate the values for the left and right subtrees of a given internal node, then operate them by using up the function corresponding to the operand string.

- This is the processing layer referred to earlier. And by the event-based commander architecture, it is triggered by simply clicking "=" (or the enter key on your keyboard, if you prefer).
