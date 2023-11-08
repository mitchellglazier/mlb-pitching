import React from 'react'

const page = () => {
  return (
    <div>
      <h2 className="page-heading">MLB</h2>
      <h3 className="page-subheading">About | Mitchell Glazier</h3>
      <div className="about-container">
        <div>
        <h2>Project</h2>
        <h3>Technologies</h3>
        <ul>
          <li><b>NextJs</b> - I decided to use NextJs for a couple of reasons. 
            I was able to develop the front end using React and create my API 
            endpoints all in one framework. I felt this would help speed up the 
            development process, as well as, simplify replicability.</li>
          <li><b>React</b> - I went with React mostly because that is what I 
            have been using more of lately and after I chose to use NextJs this 
            is what comes with it.</li>
          <li><b>D3</b> - Defacto for graphs and no reason to go else where for 
            a simple scatter plot.</li>
        </ul>
        <h3>Reusability</h3>
        <ul>
          <li><b>Base Components</b> - I created 2 base components for this project, SortableTable and SearchInput. 
            Sortable Table is used multiple times within the application and is flexible enough for this level of project. 
            Adding more conditional parameters would help scale it nicely while still make it easy to use for simple tasks. 
            The SearchInput component is only used once, however I included it here as most projects would use a searchInput 
            a couple of times.</li>
          <li><b>Chart Components</b> - BreakPlot is included as a reusable component as it takes in 3 parameters (width, height, data).
            If the data is an array of objects and the objects includes VA and HB it will work. height and width are included as parameters 
            so that it can fill the space as needed. The ticks will adjust based on size.</li>
          <li><b>Ui Components</b> - These would be components that do not include much logic but are used within the app for uniformity. 
            Navbar and PlayerHeader are included int he project as reference.</li>
        </ul>
        <h3>Styling</h3>
          <ul>
            <li><b>CSS</b> - I decided to use basic CSS for this project as it allows the most customization compared to working with a styling library. 
              I created color variables for the application so things would be uniform and tried to establish styling standards, like using px 
              in increments of 4. I used a flat method with no nesting to avoid complexity. The file is sorted alphabetically for easier reference.</li>
          </ul>
          <h3>APIs</h3>
          <ul>
            <li><b>PitchGameData</b> - This endpoint grabs all the pitches from the pitches table for a pitcher_id. It then consolidates the data under a game_pk. 
              It returns the gameID (game_pk), Game Date, Pitches Thrown, Avg Fastball Velo, and pitchTypeUsage. A majority of the work is done before it passes 
              back the data, but a little work is done on the front end to display the correct columns and grab the correct data from pitchTypeUsage.</li>
            <li><b>PitchType</b> - Similar to PitchGameData except it consolidates the pitches under a pitchType. Most of the statistics are totaled then 
              divided by the total pitches thrown. However, Avg Exit Speed and Avg Launch Angle are divided by only balls in play. It is possible to compine this 
              endpoint and PitchGameData as it is the same call to the DB. However I decided to split them as there are use cases where you would not want both 
              data sets and it may slow things down a bit on the requests.</li>
            <li><b>Players</b> - Two endpoints fall under players. The first just grabs the first 10 pitchers from the players table joined with the pitches 
              table to use as a default. The second is similar except a string is used to to filter the data on name_last or name_use. I added a button on the 
              front-end of the application to submit the name to filter on in contrast to a keystroke submit, I felt like this would help not hit the pitches table with unnecessary requests in a production environment.</li>
          </ul>
          <h3>Possible Improvements</h3>
          <ul>
            <li><b>Data Fetching</b> - A reusable component for fetching data would clean up the page components.</li>
            <li><b>Table Sort</b> - Table sort could use some improvements to identify the data type in the column and sort it accordingly.</li>
            <li><b>Stat Formatting</b> - Formatting based on a specific stat could be improved, however the structure is there to make sure improvements based on preference.</li>
            <li><b>Search Styling</b> - The Player search as is would probably be better suited in the navbar with a drop down of results. However I decided up on this solution as it may 
              be nicer as the application grew and different search filters were added, like grabbing all pitcher from a specific team.</li>
            <li><b>Layout</b> - This layout is more suited to requirements of the project than an actual pitcher page. I would also format the page in a way that a pdf could be rendered if needed.</li>
          </ul>
        </div>
        <div>
          <h2>Resume</h2>
          <h3>Los Angeles Angels</h3>
          <ul>
            <li>Built and managed data pipelines from external and internal
                sources. (SQL)
            </li>
            <li>Implemented full front end rebuild from legacy systems to
              modern framework. (Flask) (React)
            </li>
            <li>Designed highly interactive and data-rich dashboards and other
                web applications. (D3.js) (React) (Typescript)
            </li>
          </ul>
          <h3>Telenotes CRM</h3>
          <ul>
            <li> 
              Developed scheduling software designed to track the sales
              process for outside sales representatives. (Angular) (Vue)
            </li>
            <li>
              Built and implemented various public and private APIs, including
              writing documentation on use. (Node) (JSON Web Tokens)
              (SalesForce Integrations) (CosmosDB) (NestJS)
            </li>
            <li>
              Participated in code reviews and mentoring of new and junior
              developers. (Git) (Visual Studio Code)
            </li>
          </ul>
          <h3>Coinbase</h3>
          <ul>
            <li> 
              Compiled data for the purpose of investigating various issues
              related to digital currencies. (SQL) (Blockchain Tools)
            </li>
            <li>
              Planned, designed, and implemented an internal digital currency
              tracking system. (React) (Ruby on Rails)
            </li>
            <li>
              Authored reports and findings to various task forces, legal
              entities, and government agencies.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default page