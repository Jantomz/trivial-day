import random
import json

# Function to randomize the list of questions
def randomize_questions(questions):
    # Shuffle the list of questions
    random.shuffle(questions)
    
    # Optionally, shuffle the answers for each question as well
    for question in questions:
        random.shuffle(question['answers'])
    
    return questions

# Example input (replace this with your actual list)
questions_and_answers = [
    {
      "question": "What is the full name of the Talk Tuah Podcast host?",
      "answers": [
        "Sarah Wiley",
        "Hannah Brown",
        "Talia Saunders",
        "Haliey Welch",
      ],
      "correctAnswer": "Haliey Welch",
    },
    {
      "question":
        "Which country flies a green, white, and orange (in that order) tricolor flag?",
      "answers": ["Ivory Coast", "Italy", "Ireland", "India"],
      "correctAnswer": "Ireland",
    },
    {
      "question": "What is widely referred to as 'The Game'?",
      "answers": ["The Superbowl", "Harvard v. Yale", "Squidgame", "TicTacToe"],
      "correctAnswer": "Harvard v. Yale",
    },
    {
      "question": "What is not brainrot?",
      "answers": ["Skibidi Toilet", "Pink Tortillas", "Fanum Tax", "Rizzler"],
      "correctAnswer": "Pink Tortillas",
    },
    {
      "question": "How many states are in the USA?",
      "answers": ["51", "52", "49", "50"],
      "correctAnswer": "50",
    },
    {
      "question": "Which horoscope sign is a fish?",
      "answers": ["Pisces", "Big Dipper", "Taurus", "Virgo"],
      "correctAnswer": "Pisces",
    },
    {
      "question": "Which app has the most total users?",
      "answers": ["TikTok", "Twitter", "Facebook", "Instagram"],
      "correctAnswer": "Instagram",
    },

    {
      "question": "What is the name of Taylor Swift's 2023 concert tour?",
      "answers": [
        "Lover Fest",
        "The Eras Tour",
        "1989 World Tour",
        "Reputation Tour",
      ],
      "correctAnswer": "The Eras Tour",
    },
    {
      "question":
        "What video game features a plumber named Mario saving Princess Peach?",
      "answers": [
        "Donkey Kong",
        "The Legend of Zelda",
        "Super Mario Bros.",
        "Pac-Man",
      ],
      "correctAnswer": "Super Mario Bros.",
    },
    {
      "question": "What is the official language of Brazil?",
      "answers": ["Spanish", "Portuguese", "English", "French"],
      "correctAnswer": "Portuguese",
    },
    {
      "question": "Which show popularized the phrase 'Winter is Coming'?",
      "answers": [
        "Vikings",
        "Game of Thrones",
        "The Witcher",
        "Lord of the Rings",
      ],
      "correctAnswer": "Game of Thrones",
    },
    {
      "question": "What company owns the X social media platform?",
      "answers": ["Meta", "Alphabet", "Twitter", "X Corp."],
      "correctAnswer": "X Corp.",
    },
    {
      "question":
        "Who voices Donkey Kong in *The Super Mario Bros. Movie* (2023)?",
      "answers": [
        "Chris Pratt",
        "Seth Rogen",
        "Jack Black",
        "Keegan-Michael Key",
      ],
      "correctAnswer": "Seth Rogen",
    },
    {
      "question": "Which pop artist released the hit single 'Flowers' in 2023?",
      "answers": ["Miley Cyrus", "Dua Lipa", "Ariana Grande", "Doja Cat"],
      "correctAnswer": "Miley Cyrus",
    },
    {
      "question": "What is the capital of Japan?",
      "answers": ["Seoul", "Beijing", "Tokyo", "Bangkok"],
      "correctAnswer": "Tokyo",
    },
    {
      "question": "What is the main ingredient in guacamole?",
      "answers": ["Tomatoes", "Avocado", "Onion", "Lime"],
      "correctAnswer": "Avocado",
    },
    {
      "question": "Who played Wednesday Addams in Netflix’s *Wednesday* (2022)?",
      "answers": [
        "Jenna Ortega",
        "Millie Bobby Brown",
        "Sadie Sink",
        "Chloe Grace Moretz",
      ],
      "correctAnswer": "Jenna Ortega",
    },
    {
      "question": "Which K-pop group released the song 'Butter'?",
      "answers": ["Blackpink", "EXO", "TWICE", "BTS"],
      "correctAnswer": "BTS",
    },
    {
      "question": "What planet is closest to the Sun?",
      "answers": ["Earth", "Mars", "Venus", "Mercury"],
      "correctAnswer": "Mercury",
    },
    {
      "question": "What is the term for a baby kangaroo?",
      "answers": ["Cub", "Pup", "Joey", "Fawn"],
      "correctAnswer": "Joey",
    },
    {
      "question":
        "Which beverage brand is known for its 'Share a Coke' campaign?",
      "answers": ["Pepsi", "Sprite", "Coca-Cola", "Dr Pepper"],
      "correctAnswer": "Coca-Cola",
    },
    {
      "question": "What is the largest mammal in the world?",
      "answers": ["Elephant", "Blue Whale", "Giraffe", "Orca"],
      "correctAnswer": "Blue Whale",
    },
    {
      "question":
        "What social media app is known for disappearing photos and messages?",
      "answers": ["Instagram", "Snapchat", "WhatsApp", "TikTok"],
      "correctAnswer": "Snapchat",
    },
    {
      "question": "Which artist painted the 'Mona Lisa'?",
      "answers": ["Michelangelo", "Leonardo da Vinci", "Van Gogh", "Picasso"],
      "correctAnswer": "Leonardo da Vinci",
    },
    {
      "question": "What is the smallest unit of matter?",
      "answers": ["Atom", "Molecule", "Electron", "Proton"],
      "correctAnswer": "Atom",
    },
    {
      "question": "Which Marvel movie features Wakanda?",
      "answers": ["Iron Man", "Black Panther", "Doctor Strange", "Thor"],
      "correctAnswer": "Black Panther",
    },
    {
      "question": "Which animal is known as the 'King of the Jungle'?",
      "answers": ["Elephant", "Lion", "Tiger", "Gorilla"],
      "correctAnswer": "Lion",
    },
    {
      "question": "Which streaming service hosts *Stranger Things*?",
      "answers": ["Hulu", "Disney+", "Netflix", "Amazon Prime"],
      "correctAnswer": "Netflix",
    },
    {
      "question": "What is the term for fear of spiders?",
      "answers": [
        "Claustrophobia",
        "Arachnophobia",
        "Acrophobia",
        "Thanatophobia",
      ],
      "correctAnswer": "Arachnophobia",
    },
    {
      "question": "What is the name of Elon Musk's space exploration company?",
      "answers": ["Blue Origin", "Tesla", "SpaceX", "Virgin Galactic"],
      "correctAnswer": "SpaceX",
    },
    {
      "question": "What year did the Titanic sink?",
      "answers": ["1912", "1905", "1920", "1918"],
      "correctAnswer": "1912",
    },
    {
      "question": "Who won the 2023 Women’s FIFA World Cup?",
      "answers": ["USA", "England", "Spain", "Germany"],
      "correctAnswer": "Spain",
    },
    {
      "question": "What is the most-streamed song on Spotify (2023)?",
      "answers": ["Blinding Lights", "Shape of You", "Despacito", "As It Was"],
      "correctAnswer": "Blinding Lights",
    },
    {
      "question": "What is the fictional metal in *Black Panther*?",
      "answers": ["Adamantium", "Unobtainium", "Vibranium", "Mithril"],
      "correctAnswer": "Vibranium",
    },
    {
      "question": "Which holiday falls on October 31?",
      "answers": ["Thanksgiving", "Christmas", "Halloween", "Easter"],
      "correctAnswer": "Halloween",
    },
    {
      "question": "Which artist is known as the 'Queen of Pop'?",
      "answers": ["Madonna", "Lady Gaga", "Adele", "Britney Spears"],
      "correctAnswer": "Madonna",
    },

    {
      "question": "What does 'NPC' mean on TikTok?",
      "answers": [
        "Non-Player Character",
        "Not Perfectly Cool",
        "New Player Club",
        "Next Popular Creator",
      ],
      "correctAnswer": "Non-Player Character",
    },
    {
      "question": "What viral drink order features a 'Pinkity Drinkity'?",
      "answers": [
        "Starbucks Pink Drink",
        "Matcha Latte",
        "Strawberry Frappe",
        "Boba Tea",
      ],
      "correctAnswer": "Starbucks Pink Drink",
    },
    {
      "question": "Who is considered the 'CEO of Rizz'?",
      "answers": [
        "Pete Davidson",
        "Timothée Chalamet",
        "Michael B. Jordan",
        "Rizz Khalifa",
      ],
      "correctAnswer": "Pete Davidson",
    },
    {
      "question":
        "What is the term for 'the struggle to get Taylor Swift tickets'?",
      "answers": [
        "Erasgate",
        "Ticketmaster Torture",
        "Swiftie Survival",
        "The Great War",
      ],
      "correctAnswer": "Erasgate",
    },
    {
      "question": "What’s the name of the AI rapper that went viral in 2024?",
      "answers": ["AIce Cube", "FN Meka", "RoboRapper", "Lil Algorithm"],
      "correctAnswer": "FN Meka",
    },
    {
      "question": "What’s the 'icks' trend about?",
      "answers": [
        "Pet peeves in dating",
        "Fitness tips",
        "Hot takes on fashion",
        "Weird dancing",
      ],
      "correctAnswer": "Pet peeves in dating",
    },
    {
      "question":
        "Which reality TV villain said, 'I’m not here to make friends'?",
      "answers": [
        "Spencer Pratt",
        "Omarosa",
        "Christine Quinn",
        "Tiffany 'New York' Pollard",
      ],
      "correctAnswer": "Christine Quinn",
    },
    {
      "question": "What is the Skibidi Toilet chasing?",
      "answers": ["Cameramen", "Sink Soldiers", "Showerheads", "Rizzlers"],
      "correctAnswer": "Cameramen",
    },
    {
      "question": "What slang term means 'charismatic flirting ability'?",
      "answers": ["W Riz", "No Cap", "Bet", "Slaps"],
      "correctAnswer": "W Riz",
    },
    {
      "question": "Who is 'The Weeknd's' real-life alter ego?",
      "answers": ["Tesfaye Tuesday", "Abel Tesfaye", "XO Abel", "Drake Lite"],
      "correctAnswer": "Abel Tesfaye",
    },
    {
      "question": "What meme started 'Is it cake?'?",
      "answers": [
        "Hyper-realistic desserts",
        "TikTok challenges",
        "Cake Boss episodes",
        "Gordon Ramsay roasts",
      ],
      "correctAnswer": "Hyper-realistic desserts",
    },
    {
      "question": "What is 'fanum tax' slang for?",
      "answers": [
        "Unspoken rules",
        "Cover charge for an event",
        "Splitting group costs",
        "Subscription fees",
      ],
      "correctAnswer": "Splitting group costs",
    },
    {
      "question": "Who is Baby Gronk allegedly 'rizzing up'?",
      "answers": [
        "Olivia Dunne",
        "Hailey Bieber",
        "Emma Chamberlain",
        "Addison Rae",
      ],
      "correctAnswer": "Olivia Dunne",
    },
    {
      "question": "What is MrBeast’s real first name?",
      "answers": ["Jake", "James", "Jimmy", "Joseph"],
      "correctAnswer": "Jimmy",
    },
    {
      "question": "What is 'delulu' short for?",
      "answers": [
        "Deliciously Lovely",
        "Delusional",
        "Digital Loser",
        "Devious Lurker",
      ],
      "correctAnswer": "Delusional",
    },
    {
      "question": "Which fast-food chain introduced 'grimace shakes' in 2023?",
      "answers": ["McDonald’s", "Wendy’s", "Burger King", "Taco Bell"],
      "correctAnswer": "McDonald’s",
    },
    {
      "question":
        "What animal is associated with Doja Cat’s viral red carpet look?",
      "answers": ["Bat", "Cat", "Cow", "Spider"],
      "correctAnswer": "Cat",
    },
    {
      "question": "What’s the name of Beyoncé’s 2023 tour?",
      "answers": [
        "Renaissance Tour",
        "Formation Tour",
        "Ivy Park Tour",
        "Queen Bee Live",
      ],
      "correctAnswer": "Renaissance Tour",
    },
    {
      "question": "What term describes someone who only eats chicken tenders?",
      "answers": [
        "Tendie Addict",
        "Chickenitarian",
        "Picky Eater",
        "Tendie Vibes",
      ],
      "correctAnswer": "Tendie Addict",
    },
    {
      "question": "What TikTok trend involves slapping people with tortillas?",
      "answers": [
        "Tortilla Slap Challenge",
        "SmackFest",
        "Flatbread Fight",
        "Rizz Royale",
      ],
      "correctAnswer": "Tortilla Slap Challenge",
    },
    {
      "question": "Who is the voice of Bowser in *The Super Mario Bros. Movie*?",
      "answers": ["Jack Black", "Chris Pratt", "Charlie Day", "Seth Rogen"],
      "correctAnswer": "Jack Black",
    },
    {
      "question": "What does the slang 'ate and left no crumbs' mean?",
      "answers": [
        "Perfectly executed",
        "Failed miserably",
        "Cooked too much",
        "Cleaned up the kitchen",
      ],
      "correctAnswer": "Perfectly executed",
    },
    {
      "question": "What AI filter made people look old in 2023?",
      "answers": ["AgeMe AI", "MyHeritage AI", "Lensa AI", "Time Machine AI"],
      "correctAnswer": "Time Machine AI",
    },
    {
      "question": "Who starred as Ken in *Barbie* (2023)?",
      "answers": [
        "Ryan Reynolds",
        "Chris Hemsworth",
        "Ryan Gosling",
        "Henry Cavill",
      ],
      "correctAnswer": "Ryan Gosling",
    },
    {
      "question": "Which horror villain did the 'Wednesday dance' go viral with?",
      "answers": ["Michael Myers", "Ghostface", "Chucky", "Megan"],
      "correctAnswer": "Megan",
    },
    {
      "question": "What celebrity’s Met Gala outfit was compared to a ‘cat bed’?",
      "answers": ["Kim Kardashian", "Doja Cat", "Jared Leto", "Lil Nas X"],
      "correctAnswer": "Doja Cat",
    },
    {
      "question": "Who is known as the 'King of Twitch'?",
      "answers": ["xQc", "Kai Cenat", "Pokimane", "DrLupo"],
      "correctAnswer": "Kai Cenat",
    },
    {
      "question": "What’s the flavor of Prime's blue bottle?",
      "answers": [
        "Blueberry Blast",
        "Tropical Punch",
        "Blue Raspberry",
        "Arctic Freeze",
      ],
      "correctAnswer": "Blue Raspberry",
    },
    {
      "question": "What dance challenge went viral with 'Cupid' by FIFTY FIFTY?",
      "answers": ["Heart Swipe", "Knee-Spin", "Cupid Shuffle", "K-pop Hop"],
      "correctAnswer": "Cupid Shuffle",
    },
    {
      "question": "What does 'cap' mean in Gen Z slang?",
      "answers": ["A lie", "A truth", "A hat", "A joke"],
      "correctAnswer": "A lie",
    },
    {
      "question": "Who collaborated with Crocs on boots in 2023?",
      "answers": ["Post Malone", "MSCHF", "Kanye West", "Justin Bieber"],
      "correctAnswer": "MSCHF",
    },
  ]

# Randomize the questions
randomized_questions = randomize_questions(questions_and_answers)

# Print the randomized version
with open('/Users/jadenz/Programming/trivia-best/server/randomized_questions.txt', 'w') as file:
    # Write the randomized version in the format of a list of objects
    file.write(json.dumps(randomized_questions, indent=2))
