USE [questions]
GO
/****** Object:  Table [dbo].[Questions]    Script Date: 17/09/2020 13:51:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Questions](
	[questionId] [int] IDENTITY(1,1) NOT NULL,
	[questionDesc] [nvarchar](100) NOT NULL,
	[answer1] [nvarchar](100) NOT NULL,
	[answer2] [nvarchar](100) NOT NULL,
	[answer3] [nvarchar](100) NOT NULL,
	[correctAnswer] [nvarchar](100) NOT NULL,
	[questionnaire] [int] NOT NULL,
 CONSTRAINT [PK_Questions] PRIMARY KEY CLUSTERED 
(
	[questionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Teachers]    Script Date: 17/09/2020 13:51:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Teachers](
	[teacherId] [int] NOT NULL,
	[teacherName] [nvarchar](30) NULL,
	[subject] [nvarchar](20) NOT NULL,
	[matter] [nvarchar](20) NOT NULL,
	[class] [nvarchar](1) NOT NULL,
	[questionnaire] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Teachers] PRIMARY KEY CLUSTERED 
(
	[questionnaire] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Questions]  WITH NOCHECK ADD  CONSTRAINT [FK_Questions_Teachers] FOREIGN KEY([questionnaire])
REFERENCES [dbo].[Teachers] ([questionnaire])
NOT FOR REPLICATION 
GO
ALTER TABLE [dbo].[Questions] NOCHECK CONSTRAINT [FK_Questions_Teachers]
GO
