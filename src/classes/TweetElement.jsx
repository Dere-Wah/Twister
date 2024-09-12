const backend = "http://127.0.0.1:8000"

class TweetElement {
    constructor(author, body) {
		this.author = author;
		this.body = body;
		this.banned = null;
		this.controversial = null;
		this.deleted = false;
		this.replies = [];
		this.followers = null;
        this.controversy_score = null;
        this.image = null;
        this.can_edit = true;
    }


	async eval(old_tweets, controversy_score) {
        try {
            // Make the API request to /eval endpoint
            const response = await fetch(`${backend}/eval`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    author: this.author,
                    body: this.body,
                    deleted: this.deleted,
                    replies: this.replies,
                    old_tweets: old_tweets,
                    controversy_score: controversy_score
                })
            });

            // Wait for the response and parse it
            const data = await response.json();
            
            // Update the TweetElement instance with the response data
            this.banned = data.banned;
            this.controversial = data.controversial;
            this.replies = data.replies;
			this.followers = data.percentage_of_followers_gained_or_lost;
            this.controversy_score = data.controversy_score
        } catch (error) {
            console.error("Error during evaluation:", error);
        }
    }

    async delete(old_tweets, controversy_score){
      	this.deleted = true;
        const fws = this.followers;
		if(this.controversial >= 50){
			await this.eval(old_tweets, controversy_score);
		}
        this.followers = fws;
		this.banned = 0;
    }
}

export default TweetElement;