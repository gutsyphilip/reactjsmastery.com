# Delivering Food Recipes over Whatsapp using Twilio
In a widely connected world like ours, humans have continued to discover more creative and natural ways to share all kinds on information with interested individuals.

In this article, we ride on this trend by using the Twilio API to build a WhatsApp application that is capable of providing information on how to prepare various food recipes to users based on their interest.

## **User Journey:**
A user sends a message of a particular recipe he/she is interested in making and receives a response containing the steps he/she needs to take to prepare this recipe.
 

## Prerequisites

To follow along easily with this tutorial, you are expected to:


- Have sufficient understanding of Python and Flask
- Have [Python 3](https://www.python.org/downloads/) installed on your machine
- Have Pip installed on your machine
- Have [MongoDB](https://docs.mongodb.com/manual/installation/) installed on your machine
- Have [Ngrok](https://ngrok.com/) installed on your machine

Now, let’s get started!

## Getting Started - Setting up on Twilio  
1. First, we need to create an account on Twilio and sign in. Since we would be working extensively with the Whatsapp API, you’d need to activate a Twilio sandbox for whatsapp.


>  The [**Twilio Sandbox for WhatsApp**](https://www.twilio.com/console/sms/whatsapp/sandbox) allows you to immediately test with WhatsApp using a phone number without waiting for your Twilio number to be approved by WhatsApp.


2. Next, we will need to provide a webhook url which will be called whenever a message is received . After building our application, we will be using [ngrok](https://ngrok.com/download) to expose our application via a unique url that is accessible over the web.

Now, let’s get to building the application.

## Application Setup

As earlier mentioned, we are going to be using the Flask framework and MongoDB as our preferred database. 

To get started, make sure you have Python3 and MongoDB installed on your computer.

Next, run the following commands in your terminal to  create the project folder and virtual environment for this project.


- Create project directory named `whatsapp_recipes`


    mkdir whatsapp_recipes && cd whatsapp_recipes


- Create a virtual environment for the project


    python3 -m venv venv


- Activate the virtual environment


    source venv/bin/activate

The  virtual environment we have created helps create an isolated environment, separate from the global python environment to run our project.

**Structuring the project**
Now that we have created the project, we need to set up the folder structure for the project. In the application directory, run the commands below to create the appropriate files and directories needed:


    mkdir services utils


    touch app.py

At this point, your folder structure should look like this:


Now there’s one more step we need to take to successfully set up our project. Let’s install all the dependencies used in this project.

**Installing Project Dependencies**

- **Flask**
    We will be using this to run our webserver.
    
- **Pymongo**
    This library will be used to interface with the MongoDB instance on your computer.
    
- **Twilio library**
    The Twilio will help us construct Twilio XML responses which we will be using to reply received WhatsApp Messages. You can learn more about this in the [Twilio docs.](https://www.twilio.com/docs/sms/twiml)

Without further ado, run the command below to install the dependencies:


    pip install Flask pymongo twilio

All done? Now let’s set up our database.


## Database Setup

In this section, we are going to be inserting some dummy recipes data into our MongoDB database and create indexes on the collection so as to be able to perform full text search on the data. 

You can download my sample recipes data [here](https://docs.google.com/document/d/1UugBp3zDaf5wb0hr5tCmaQx_pybv1bXWcMDyYQ47Sfw/edit?usp=sharing). 

Create a `data.json` file in the root directory of this project and paste the sample recipes data from the document above.  Run the commands below one after the other in your terminal to insert records into your database from this file. Note that `data.json` must be in the same directory as the current working directory on the terminal.


- Open the python shell
    
    python


- Import json


    import json


- Import the MongoClient


    from pymongo import MongoClient


- Configure local client


    client = MongoClient('mongodb://localhost/')


- Create new mongo instance and collection


    recipes = client\['twilio'\]['recipes']


- Populate DB with data from text file


    with open('data.json') as read_file:
      json_data = json.loads(read_file.read())
      for data in json_data:
          recipes.insert_one({'name': data['name'], 'steps': data['steps']})

The above commands open python shell, loops over the data in the `data.json` file and inserts the data into the first_aid collection.

Next, execute the commands below sequentially to create an index for the collection:


    mongo


    use twilio;


    db.recipes.createIndex({name: 'text'});

The output to the above commands should look like the screenshots below:


![User-uploaded image: Screen+Shot+2020-02-14+at+12.52.06+AM.png](https://paper-attachments.dropbox.com/s_62B8CBA438D645DFB01FC8FE3730F4BCCCC409421DCA8CCFE60423056514191E_1581637944108_Screen+Shot+2020-02-14+at+12.52.06+AM.png)

## Building the Application:

First, let us write the code that’d handle all our database searches. We are going to be using the full text search functionality of MongoDB to help match the records we have created, against the ailment sent by the user. 

Create a file called `recipes.py` in the `services` directory and paste the following inside:


    from pymongo import MongoClient
    client = MongoClient('mongodb://localhost/')
    recipes = client\['twilio'\]['recipes']
    def search_recipe(search_word):
        cursor = recipes.find({'$text': {'$search': search_word}})
        result = []
        for data in cursor:
            result.append(data)
        return result

The `search_recipe``()` function above receives the recipe name sent by the user, performs a search on the database and returns matching results.

Next, we are going to write a function to format the Mongo DB result into a readable format that can be sent as a message to the user. Create a file called `message.py` in the `utils` directory and copy the following inside:


    def convert_result_to_message(result):
        if len(result) == 0:
            return "Sorry, we currently don't have any recipe pertaining to your food."
        message = ""
        for data in result:
            message += f"Food: {data['name']}\n"
            message += "Steps\n"
            count = 1
            for step in data['steps']:
                message += f"{count}. {step}\n"
                count += 1
            message += '\n\n'
        return message

From the above code, when we can’t match the injury against any record in our database, we send a default response. Otherwise, we send a composed response displaying all matching records in the format:


    Food: 
    Some text here
    Steps:
    Some more text here

Finally, we are going to write the endpoint that will be called when a user sends a WhatsApp message. Open your `app.py` file and copy the following inside:


    from flask import Flask, request
    from twilio.twiml.messaging_response import MessagingResponse
    from services.recipes import search_recipe
    from utils.message import convert_result_to_message
    app = Flask(__name__)
    
    @app.route('/')
    def hello_world():
        return 'Hello World!'
    
    @app.route('/whatsapp', methods=['POST'])
    def reply_with_recipe_info():
        food_name = request.values.get('Body')
        print('Message sent', food_name)
        recipes = search_recipe(food_name)
        message = convert_result_to_message(recipes)
        response = MessagingResponse()
        response.message(message)
        return str(response)
    
    if __name__ == '__main__':
        app.run()

In the above code, we have a base url that returns Hello World! to the client. This exists simply to be used as proof that our server is live.

The `/whatsapp` route is where the fun happens. We use `request.values.get('Body'`) to get the message sent by the user. Afterwards, we pass the message to the `search_recipe()` function written earlier in our `services/recipes.py` file. The result is then passed to the `convert_result_to_message()` function which generates the user friendly message to be sent back as a response.

 To send back a response, you can either manually write the XML or use the Twilio library to construct it as stated earlier. i.e
 

    response = MessagingResponse()
        response.message(message)

This response is returned as a string and is sent to to the user over Whatsapp.

Voila! We are done. It’s testing time!

## Testing the application

To run the application, execute the command below in your terminal


    python app.py

Next, you have to expose the port on which the application is running using ngrok so that your application is accessible over the internet. Navigate to the directory into which you have downloaded the ngrok file using your terminal and execute the command below:


    ngrok http <your_application_port>
    # e.g ngrok http 5000

The above command tells ngrok to expose your application port over the internet. You should see an output like the one below which gives you a public URL through which your app can be accessed over the web.


![User-uploaded image: Screen+Shot+2020-02-07+at+3.53.28+AM.png](https://paper-attachments.dropbox.com/s_62B8CBA438D645DFB01FC8FE3730F4BCCCC409421DCA8CCFE60423056514191E_1581044020735_Screen+Shot+2020-02-07+at+3.53.28+AM.png)


Copy that URL, paste it into the space provided on [your twilio dashboard](https://www.twilio.com/console/sms/whatsapp/sandbox) for the callback URL and append the `/whatsapp` route. See image below. 


![](https://paper-attachments.dropbox.com/s_262BFC3CD87D173E64CD747EEBCD9C2152DAC44AA398C6B71919BD63759C40E7_1582067466397_image.png)


You can now send a message to the phone number indicated on the Twilio WhatstApp sandbox and receive a response containing the steps for any of our sample recipes.


## Demo
![](https://paper-attachments.dropbox.com/s_262BFC3CD87D173E64CD747EEBCD9C2152DAC44AA398C6B71919BD63759C40E7_1582067513895_image.png)

## Conclusion

We have now come to the end of this tutorial. So far, we successfully built an app that delivers food recipes over WhatsApp using Twilio and Python(Flask). Feel free to push the boundaries of this project and the Twilio API by improving the feature implemented above and continue to work on more exciting projects like this.

You may find the source code for this tutorial here on GitHub.

**See you in the next one!✌🏿**


