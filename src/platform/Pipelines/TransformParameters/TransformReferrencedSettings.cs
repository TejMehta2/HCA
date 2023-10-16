using Sitecore.Data;
using Sitecore.XA.Feature.LayoutServices.Integration.Pipelines.TransformParameters;
using Sitecore.Xml;
using System.Collections.Generic;
using System.Linq;
using System.Xml;

namespace HCACloud.Platform.Pipelines.TransformParameters
{
    public class TransformReferrencedSettings : TransformParametersProcessor
    {

        protected override string SupportedParameter { get; }

        private List<RenderingParam> SupportedParameters { get; set; }

        public TransformReferrencedSettings()
        {
            SupportedParameters = new List<RenderingParam>();
        }

        public void AddSupportedParameter(XmlNode node)
        {
            var paramType = XmlUtil.GetAttribute("type", node);
            var paramValueField = XmlUtil.GetAttribute("valuefield", node);
            SupportedParameters.Add(new RenderingParam() { Type = paramType, ValueField = paramValueField });
        }

        protected override void ProcessParameter(TransformParametersArgs args)
        {
            if (!this.SupportedParameters.Any(x => args.Rendering.RenderingParams.ContainsKey(x.Type)))
                return;

            foreach (var supportedParam in SupportedParameters)
            {
                if (!args.Rendering.RenderingParams.ContainsKey(supportedParam.Type))
                    continue;

                var stringList = new List<string>();
                var renderingParam = args.Rendering.RenderingParams[supportedParam.Type];

                string fieldValue;
                string paramItemName;

                if (ID.TryParse(renderingParam, out var result))
                {
                    var paramItem = this.ContentRepository.GetItem(result);
                    if (paramItem != null)
                    {
                        fieldValue = !string.IsNullOrEmpty(supportedParam.ValueField) ? paramItem[supportedParam.ValueField] : "";
                        paramItemName = paramItem.Name;
                        args.Rendering.RenderingParams[supportedParam.Type] = fieldValue;
                        args.Rendering.RenderingParams.Add($"{supportedParam.Type}_ItemName", paramItemName);
                    }
                }
            }
        }

        protected class RenderingParam
        {
            public string Type { get; set; }
            public string ValueField { get; set; }
        }

    }
}
