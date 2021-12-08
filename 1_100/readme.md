Build Guide

- Each guess value will be appended to an unordered list as a list item
- The proximity between the guess value and the actual number will be expressed via the background of the number being a 
hot color 
(red orange yellow) 

and a cold color 
(light blue to dark ice blue)

- The elements of the unordered list will be inline w/ one another

-----------------------
Text field and button
-----------------------

- Off-hover the button will have an arrow icon and on-hover the button will stretch to fit the text inside

-----------------------
Upon entry of input
-----------------------
Every time I make a guess
1.) Comparison is made to rand (random number)

2.) If my guess is wrong 

    - I will append a div w/ a nested li element that contains the value to my guess list

    - If my number is within 35+ numbers of the rand, the outline will be an ice blue
                             35 numbers of the rand, the outline will be teal
                             27 numbers of the rand, the outline will be yellow-green (matte lime) 
                             20 numbers of the rand, the outline will be yellow 
                             10 numbers of the rand, the outline will be orange,
                              5 numbers of the rand the outline will be orange-red

3.) The number of direct child elements in the list will not exceed 10 items

4.) switch case for each case of 