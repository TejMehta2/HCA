using Microsoft.Extensions.DependencyInjection;
using Sitecore;
using Sitecore.DependencyInjection;
using Sitecore.JavaScriptServices.Configuration;
using Sitecore.JavaScriptServices.ViewEngine.LayoutService.Pipelines.GetLayoutServiceContext;
using Sitecore.LayoutService.ItemRendering.Pipelines.GetLayoutServiceContext;
using Sitecore.XA.Foundation.SitecoreExtensions.Repositories;

namespace HCACloud.Platform.Pipelines.GetLayoutServiceContext
{
    public class MicrositeTheme : JssGetLayoutServiceContextProcessor
    {
        public MicrositeTheme(IConfigurationResolver configurationResolver) : base(configurationResolver)
        {
        }

        protected IContentRepository ContentRepository { get; } = ServiceLocator.ServiceProvider.GetService<IContentRepository>();


        protected override void DoProcess(GetLayoutServiceContextArgs args, AppConfiguration application)
        {
            var siteRoot = Context.Database.GetItem(Context.Site.RootPath);
            var themeId = siteRoot["theme"];

            var themeItem = this.ContentRepository.GetItem(themeId);
            var theme = themeItem != null ? themeItem["Name"] : "theme-daylight";

            var colourPaletteId = siteRoot["colour Palette"];
            var colourPaletteItem = this.ContentRepository.GetItem(colourPaletteId);
            var colourPalette = colourPaletteItem?["Name"];

            var buttonShapeId = siteRoot["button Shape"];
            var buttonShapeItem = this.ContentRepository.GetItem(buttonShapeId);
            var buttonShape = buttonShapeItem?["Name"];

            args.ContextData.Add("theme", (object)new
            {
                name = theme,
                colourPalette = colourPalette,
                buttonShape = buttonShape
            });
        }
    }
}