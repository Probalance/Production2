var sendgrid_API_KEY   = process.env.SENDGRID_API_KEY;

import { setApiKey, Email, send } from '@sendgrid/mail';
setApiKey(sendgrid_API_KEY);
var email      = new Email();

var app = express();
app.use(bodyParser.json()); //needed for req.body
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname));

app.post('https://api.sendgrid.com/v3/mail/send', function(req, res) {
    email.addTo(req.body.to);
    email.setFrom(req.body.from);
    email.setSubject(req.body.subject);
    email.setText(req.body.text);
    email.addHeader('X-Sent-Using', 'SendGrid-API');
    email.addHeader('X-Transport', 'web');

    send(email, function(err, json) {
    if (err) { 
        return res.send("Problem Sending Email from server!!!!");
    }
        console.log(json);
        res.send("Email Sent OK!!!!");
    });
});
var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port')  ) ;
});