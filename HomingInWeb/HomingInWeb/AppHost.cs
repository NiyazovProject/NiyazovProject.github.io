using System.IO;
using Funq;
using ServiceStack;
using ServiceStack.Configuration;
using ServiceStack.Razor;
using HomingInWebservice.ServiceInterface;
using ServiceStack.OrmLite;
using ServiceStack.Data;
using HomingInWebservice.ServiceModel.Models;

namespace HomingInWeb
{
    public class AppHost : AppHostBase
    {
        /// <summary>
        /// Default constructor.
        /// Base constructor requires a name and assembly to locate web service classes. 
        /// </summary>
        public AppHost() : base("HomingInWeb", typeof(AuthenticationService).Assembly)
        {
            var customSettings = new FileInfo(@"~/appsettings.txt".MapHostAbsolutePath());
            AppSettings = customSettings.Exists ? (IAppSettings)new TextFileSettings(customSettings.FullName) : new AppSettings();
        }

        /// <summary>
        /// Application specific configuration
        /// This method should initialize any IoC resources utilized by your web service classes.
        /// </summary>
        /// <param name="container"></param>
        public override void Configure(Container container)
        {
            //Config examples
            //this.Plugins.Add(new PostmanFeature());
            //this.Plugins.Add(new CorsFeature());

            SetConfig(new HostConfig
            {
                AddRedirectParamsToQueryString = true,
#if !DEBUG
				EnableFeatures = Feature.All.Remove(Feature.Metadata),
				DebugMode = false,  //set to false to hide stacktraces
#endif
                DefaultContentType = MimeTypes.Json,
				ScanSkipPaths = { "node_modules/","bin/","obj/","bower_components/", "wwwroot/", "wwwroot_build/" },
            });




            //TODO: config file
            var connectionString = "server=homingin-dev.cjhege86yqlo.us-west-2.rds.amazonaws.com;uid=homingin;pwd=WantToSeeMyKung-Fu?;database=HomingIn";
            //var connectionString = "server=production.cjhege86yqlo.us-west-2.rds.amazonaws.com;uid=homingin;pwd=WantToSeeMyKung-Fu?;database=HomingIn";
            var connectionFactory = new OrmLiteConnectionFactory(connectionString, MySqlDialect.Provider);
            MySqlDialect.Provider.RegisterConverter<PictureData>(new PictureDataConverter());
            container.Register<IDbConnectionFactory>(connectionFactory);

            using (var db = connectionFactory.Open())
            {
                db.CreateTableIfNotExists<User>();
                db.CreateTableIfNotExists<Estimate>();
                db.CreateTableIfNotExists<EstimateResponse>();
                db.CreateTableIfNotExists<AgentPostalCode>();
                db.CreateTableIfNotExists<EstimatePicture>();
                db.CreateTableIfNotExists<PushDevice>();
                db.CreateTableIfNotExists<PasswordReset>();
                db.CreateTableIfNotExists<ConversationMessage>();
                db.CreateTableIfNotExists<GoogleAccount>();
                db.CreateTableIfNotExists<PremiumInfo>();
            }

            this.Plugins.Add(new RazorFormat());
        }
    }
}
