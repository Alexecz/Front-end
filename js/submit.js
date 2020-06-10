const SUBMISSIONS_URL = 'https://app-submissions-ae-aut.azurewebsites.net/api/moderation';

bibFile();

function bibFile(){
    document.getElementById("bibtex")
    .addEventListener('change', function() { 
              
        var fr=new FileReader(); 
        fr.onload=function(){ 
           console.log(JSON.stringify(toJSON(fr.result)[0]));
           var JsonBib = toJSON(fr.result)[0];

           document.getElementById("title").value=JsonBib.entryTags.TITLE;
           document.getElementById("author").value=JsonBib.entryTags.AUTHOR;
           document.getElementById("journal").value=JsonBib.entryTags.JOURNAL;
           document.getElementById("year").value=JsonBib.entryTags.YEAR;
           document.getElementById("doi").value=JsonBib.entryTags.DOI;
           document.getElementById("volume").value=JsonBib.entryTags.VOLUME;
           document.getElementById("pages").value=JsonBib.entryTags.PAGES;
           document.getElementById("journalIssue").value=JsonBib.entryTags.JOURNALISSUE;
           
        } 
          
        fr.readAsText(this.files[0]); 
    }) 
  }

function serializeFormToJson(formData){
    var unindexed_array = formData.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
		if (n.value != '') {
			if (n.name == 'year' || n.name == 'volume' || n.name == 'journalIssue') {
				indexed_array[n.name] = parseInt(n.value);
			} else {
				indexed_array[n.name] = n.value;
			}
		}		
    });

    return JSON.stringify(indexed_array);
}

function submitArticle(){
    document.getElementById("doi").classList.remove("is-invalid");

    if(document.getElementById("doi").value == ""){
        document.getElementById("doi").classList.add("is-invalid");
        return;
	}

	fetch(SUBMISSIONS_URL, {
      	method: 'POST',
      	headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
        body: serializeFormToJson($("#form"))
	})
	.catch(err => {
		console.log(err);
	});
}