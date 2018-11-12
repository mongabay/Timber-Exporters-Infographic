# Timber Exporters Ranking

This is the English version of the database infographic created by Ojo Publico for the Madera Sucia series

AWS CLI commands
The AWS SLI uses a Unix-like command-line syntax for listing, copying, moving and deleting files
See the AWS CLI command reference for a full description of available CLI commands
// List the contents of the bucket
$ aws s3 ls s3://mongabay-imgs/vz/
// copy a single file
$ aws s3 cp readme.doc s3://mongabay-imgs/madera_sucia_vz/
// sync and delete remote files no longer on localhost, append --dryrun to test
$ aws s3 sync . s3://mongabay-imgs/madera_sucia_vz/ --delete --exclude ".git/*" --exclude "node_modules/*" --exclude ".gitignore" --exclude "readme.md" --dryrun 
$ aws s3 sync .s3://mongabay-imgs/madera_sucia_vz/ --delete --exclude ".git/*" --exclude "node_modules/*" --exclude ".gitignore" --exclude "readme.md""
// copy all files from remote to local
aws s3 cp s3://mongabay-imgs/madera_sucia_vz/ ./ --recursive 
