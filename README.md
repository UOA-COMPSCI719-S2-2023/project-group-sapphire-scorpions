Final project &ndash; A personal blogging system &ndash; Starter project
==========

Implementation of compulsory features (50 marks) 

There are a set of compulsory features which comprise the basic functionality for a blogging system. Your team must implement all of these features adequately to receive full marks for this section.

The following table contains a list of all compulsory features:

Feature Description

1 - Users must be able to create new accounts. Each new user should be able to choose a username (which must be unique) and a password. At minimum, a user’s real name and date of birth should also be recorded, along with a brief description about themselves.

2 - When selecting a username while creating an account, users should be immediately informed if the given username is already taken. Users should not have to submit a form to discover whether their chosen username is taken (i.e. you should use fetch() or similar to implement this feature).

3 - When selecting a password while creating an account, users should be presented with two password textboxes (e.g. “Choose password”, and “re-enter password”). They must type the same password in each box in order to proceed. If the user didn’t enter the same password in both textboxes, they should not be allowed to submit the form.

4 - When creating an account, users must be able to choose from amongst a set of predefined “avatar” icons to represent themselves.

5 - Once a user has created an account, they must be able to log in and log out.

6 - Research: Passwords should not be stored in plaintext in the database. Investigate the use of password hashing and salting. The bcrypt npm package may be of use here, but you’re free to solve this problem in any way you choose.

7 - Users must be able to browse a list of all articles, regardless of whether they are logged in or not. If logged in, they should additionally be able to browse a list of  their own articles.

8 - When logged in, users must be able to add new articles, and edit or delete existing articles which they have authored. 

9 Research: When authoring articles, a text editor with WYSIWYG (What You See Is What You Get) support should be provided. The documentation for your WYSIWYG component of choice should be able to help with this. We recommend QuillJS or TinyMCE, but you may choose an alternative if you wish. Make sure to research different options for editors carefully as some will be much more suitable than others. The WYSIWYG editor should at minimum allow users to make titles, subtitles, bold text, italic text and bullet points Users must be able to upload an image with articles they create; when viewing articles, the image must be displayed with the article but does not need to be embedded within the text of the article. You may choose to allow users to embed multiple images within articles; however, if you do this, you must investigate a WYSIWYG that properly supports this feature with multiple file uploads. You may allow extra functionality in the editor; however, any options available in the WYSIWYG should be fully functional and generate content that displays appropriately in your page.

10 - Users must be able to edit any of their account information, and also be able to delete their account. If a user deletes their account, all of their articles should also be deleted.

11 The website must have a consistent look and feel, and must be responsive.

CSS should be written from scratch - use of frameworks such as Bootstrap is not allowed.

The majority of the features identified in this section can be implemented entirely using the tools, frameworks & techniques taught in CS719. However, the features marked with research require content which has not been taught. Your team will be required to research and implement an appropriate solution (which will likely involve the use of third-party libraries/ packages).

Implementation of extra features (20 marks)

There are many improvements which could be made to the user experience and / or functionality of your system after implementing the compulsory features. Your team will have the chance to propose a set of extra features which will enhance your website and make it unique.

As a team, discuss and decide on a set of extra features which you will implement. This could be one “big” feature requiring a significant amount of development, or several “smaller” features. When ready - but no later than the deadline at the beginning of this document - @ your course coordinator in your private team Slack channels for them to approve. Once approved, you know that you have the chance to earn full marks for this section. If you do not get your proposed extra features approved, you run the risk of losing marks due to an insufficient set of extra features.

As a guide, consider that the extra features should take a total of around 10 hours per person to complete.

Code style (15 marks)

Your code must be easily understandable by third parties, and conform to best practices. This includes the use of appropriate variable and identifier names, sufficient commenting, adherence to applicable patterns such as DAO, and appropriate use of node.js modules, middleware, routers and Handlebars.

Progress updates and project management (5 marks)

Your team is expected to make regular progress reports on Slack. At least twice per week, your team should make a post to the #general channel of the class Slack workspace.

The posts don’t have to be long - at most a few sentences - and should contain the following 

information: i. what have you done so far / since your last progress update, ii. what are you doing now, and iii. what is yet to be done? Feel free to include screenshots, triumphs, frustrations, and / or anything else you like. This is your chance to let everyone in the class (and your instructors) know how your journey is progressing! Make sure your posts include your team name, so it’s easy to identify when each team is posting!

In addition, your team should maintain a Trello board which is kept regularly up-to-date*. Your team should create a board, and add your coordinator (Andrew Meads, andrew.meads@auckland.ac.nz). Other than that, it is largely up to you how to manage them. We suggest you add columns for “To-Do”, “Doing”, “QA / Testing”, and “Done”, assign tasks to team members, and use time estimates.

*If you have an alternate project management tool you’d like to use, please feel free to ask your coordinator Andrew, by sending him a DM on Slack.

Video presentation and demo (10 marks)

By the deadline given at the top of this document, your team should submit a video, where you demonstrate the features of your blogging system and talk about the overall system
architecture. Your demo can be a live demo of the running webapp, or a slideshow-based presentation with screenshots (your choice). You don’t need to go into low-level implementation details. The video should be no more than 15 minutes in length, and each team member should get the chance to speak.

The videos should be submitted to the “Project videos” Canvas assignment page on or before the deadline. The coordinator will then make the videos available for everyone in the
class to view. Videos will be assigned to each individual to view and comment upon as part of the individual assessment (see below).


Individual Deliverables (worth 20% overall)

In addition to the team component, each individual should:

1 - Submit an individual reflective report; and
2 - Peer review two other teams’ videos; and
3 - Submit a peer evaluation of your team and team members 

These deliverables, along with your personal contribution towards the project, will form 20% of your final grade for CS719.


