// Your code here

	function fetchMovie()
	{
		fetch("http://localhost:3000/films")
		.then((resp) => resp.json())
		.then((json) => movieList(json))
		.catch(function(error)
		{
			console.log(error);
		});
	}

	function movieList(movies)
	{
		movies.map(function (movie)
		{
			const movieList = document.getElementById('films');
			const movieEntry = document.createDocumentFragment();
			let li = document.createElement('li');
			li.setAttribute("class", "movie-list");
			let emphasis = document.createElement('strong');
			emphasis.textContent = movie.title;
			emphasis.setAttribute("class", "list-format");

			link = document.createElement('a');
			link.setAttribute("id", `${movie.id}`);
			link.setAttribute("target", "_self");
			link.appendChild(emphasis);

			li.appendChild(link);
			movieEntry.appendChild(li);
			movieList.appendChild(movieEntry);

			movieID = document.getElementById(`${movie.id}`);

			movieID.addEventListener('click', function(event)
			{
				event.preventDefault();
				const moviePoster = document.getElementById('poster');

				if (moviePoster.hasAttribute("src") && moviePoster.hasAttribute("alt"))
				{
					moviePoster.removeAttribute("src");
					moviePoster.setAttribute("src", `${movie.poster}`);
					moviePoster.removeAttribute("alt");
					moviePoster.setAttribute("alt", `${movie.title}`);
				}
				else
				{
					moviePoster.removeAttribute("src");
					moviePoster.setAttribute("src", `${movie.poster}`);
					moviePoster.removeAttribute("alt");
					moviePoster.setAttribute("alt", `${movie.title}`);
				}

				const movieTitle = document.getElementById("title");
				movieTitle.textContent = movie.title;

				movieRuntime = document.getElementById('runtime');
				movieRuntime.textContent = `${movie.runtime} minutes`;

				movieDescription = document.getElementById('film-info')
				movieDescription.textContent = movie.description;

				movieShowtime = document.getElementById('showtime');
				movieShowtime.textContent = movie.showtime;

				movieTickets = document.getElementById('ticket-num');

				let tickets = movie.capacity - movie.tickets_sold;

				if(tickets<=0)
				{
					movieTickets.textContent = 0;
				}
				else
				{
					movieTickets.textContent = tickets;
				}

				ticketPurchase = document.getElementById('buy-ticket');

				ticketPurchase.addEventListener('click', function(event)
				{
					event.preventDefault();
					if (tickets>0)
					{
						let newCapacity = movie.capacity - 1;
						let newTickets = movie.tickets_sold + 1;

						newTicketInfo = {capacity: newCapacity, tickets_sold: newTickets};

						const requestContent =
						{
							method: "PATCH",
							headers: {
								"Content-Type": "application/json",
								Accept: "application/json",
							},
							body: JSON.stringify(newTicketInfo),
						};

						fetch(`http://localhost:3000/films/${movie.id}`, requestContent)
						.then((resp) => resp.json())
						.then((json) => console.log(json))
						.catch(function (error)
						{
							alert(`Error ${error.message}`);
							console.log(error.message);
						});
					}
					else
					{
						alert("No tickets available for purchase!");
					}
				});

			});
		});
	}

	document.addEventListener('DOMContentLoaded', function(event)
	{
		fetchMovie();
		event.preventDefault();

	});